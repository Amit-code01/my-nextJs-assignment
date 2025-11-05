// pages/api/products/index.js
import { readProducts, writeProducts } from "../../../utils/dataStore";
import { v4 as uuidv4 } from "uuid";

export default function handler(req, res) {
  if (req.method === "GET") {
    const products = readProducts();
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    const key = req.headers["x-admin-key"];
    if (key !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { name, slug, description, price, category, inventory } = req.body;
    if (!name || !slug || !price) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const products = readProducts();
    const newProduct = {
      id: uuidv4(),
      name,
      slug,
      description,
      price: Number(price),
      category: category || "uncategorized",
      inventory: Number(inventory) || 0,
      lastUpdated: new Date().toISOString(),
    };
    products.push(newProduct);
    writeProducts(products);
    return res.status(201).json(newProduct);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end();
}
