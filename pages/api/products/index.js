import connectDb from "../../../utils/connectDb.js";
import Product from "@/models/product.js";
// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req, res) {
  connectDb();
  const { method } = req;
  if (method === "GET") {
    try {
      console.log('haha')
      const getAllProducts = await Product.find();
      console.log('fuck you', getAllProducts)
      res.status(200).json(getAllProducts);
    } catch (err) {
      console.log('ajabaaaa')
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
