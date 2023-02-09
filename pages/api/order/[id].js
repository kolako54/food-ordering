import Order from "@/models/Order";
import dbConnect from "@/utils/connectDb";
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
    const { method, query: { id } } = req;
    dbConnect();
    if (method === "GET") {
        try {
            const order = await Order.findById(id);
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}