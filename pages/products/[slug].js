
import Layout from "../../components/Layout";
import { Typography, Divider } from "@mui/material";
import { readProducts } from "../../utils/dataStore";

export default function ProductDetail({ product }) {
  if (!product)
    return (
      <Layout>
        <Typography variant="h6">Product not found.</Typography>
      </Layout>
    );

  return (
    <Layout title={product.name}>
      <Typography variant="h4" gutterBottom>{product.name}</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>{product.description}</Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6">Price: ${product.price}</Typography>
      <Typography>Category: {product.category}</Typography>
      <Typography>Inventory: {product.inventory}</Typography>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { readProducts } = await import("../../utils/dataStore");
  const products = readProducts();
  const paths = products.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { readProducts } = await import("../../utils/dataStore");
  const products = readProducts();
  const product = products.find((p) => p.slug === params.slug) || null;
  if (!product) return { notFound: true, revalidate: 60 };
  return { props: { product }, revalidate: 60 };
}
