// pages/api/productsBySlug/[slug].js
import { readProducts } from "../../../utils/dataStore";

export default function handler(req, res) {
  const { slug } = req.query;
  const products = readProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.status(200).json(product);
}
