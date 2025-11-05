// utils/dataStore.js
let fs;
let path;

if (typeof window === "undefined") {
  // Import only on server
  fs = require("fs");
  path = require("path");
}

export function readProducts() {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

export function writeProducts(products) {
  const filePath = path.join(process.cwd(), "data", "products.json");
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}
