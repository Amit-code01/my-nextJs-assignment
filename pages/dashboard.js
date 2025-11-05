// pages/dashboard.js
import Layout from "../components/Layout";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import { readProducts } from "../utils/dataStore";

export default function Dashboard({ stats, products }) {
  return (
    <Layout title="Dashboard">
      <Typography variant="h5" gutterBottom>Inventory Dashboard</Typography>
      <Typography>Total products: {stats.totalProducts}</Typography>
      <Typography>Total inventory: {stats.totalInventory}</Typography>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Inventory</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id} hover>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>${p.price}</TableCell>
              <TableCell sx={{ color: p.inventory <= 10 ? "error.main" : "text.primary" }}>
                {p.inventory}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { readProducts } = await import("../utils/dataStore");
  const products = readProducts();
  const stats = {
    totalProducts: products.length,
    totalInventory: products.reduce((sum, p) => sum + (p.inventory || 0), 0),
  };
  return { props: { stats, products } };
}
