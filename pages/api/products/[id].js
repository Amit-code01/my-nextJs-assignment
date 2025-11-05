// pages/api/products/[id].js
import { readProducts, writeProducts } from "../../../utils/dataStore";

export default function handler(req, res) {
  const { id } = req.query;
  const key = req.headers["x-admin-key"];
  if (req.method === "PUT") {
    if (key !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const updates = req.body;
    const products = readProducts();
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ message: "Not found" });

    products[idx] = { ...products[idx], ...updates, lastUpdated: new Date().toISOString() };
    writeProducts(products);
    return res.status(200).json(products[idx]);
  }
  res.setHeader("Allow", ["PUT"]);
  res.status(405).end();
}
