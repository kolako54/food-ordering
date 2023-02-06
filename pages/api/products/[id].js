import connectDb from "../../../utils/connectDb.js";
import Product from "@/models/product.js";
// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req, res) {
  connectDb();
  const { method, query: {id} } = req;
  if (method === "GET") {
    try {
      const products = await Product.findById(id);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      const product = await Product.findByIdAndDelete(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};