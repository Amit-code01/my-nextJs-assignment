// components/ProductCard.js
import { Card, CardContent, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.category} • ${product.price}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Stock: {product.inventory}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          component={Link}
          href={`/products/${product.slug}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
