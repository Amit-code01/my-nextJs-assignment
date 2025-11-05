// pages/index.js
import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";








export default function Home({ products }) {
  const [query, setQuery] = useState("");
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout title="Home">
      <TextField
        fullWidth
        label="Search products"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={3}>
        {filtered.map((p) => (
         <Grid size={{ xs: 12, sm: 6, md: 4 }}>

            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getStaticProps() {
  const { readProducts } = await import("../utils/dataStore");
  const products = readProducts();
  return { props: { products } };
}
