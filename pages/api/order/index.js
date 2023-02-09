import connectDb from "../../../utils/connectDb.js";
import Orders from "@/models/Order.js";
// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req, res) {
  connectDb();
  const { method } = req;
  if (method === "GET") {
    try {
      const getAllOrder = await Orders.find();
      res.status(200).json(getAllOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const Order = await Orders.create(req.body);
      console.log(Order.data)
      res.status(201).json(Order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
