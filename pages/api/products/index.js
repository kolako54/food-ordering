import connectDb from "../../../utils/connectDb.js";
import Product from "@/models/product.js";
export default async (req, res) => {
  connectDb();
  const { method } = req;
  if (method === "GET") {
    try {
      const getAllProducts = await Product.find();
      res.status(200).json(getAllProducts);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
