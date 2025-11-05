// pages/admin.js
import Layout from "../components/Layout";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import { useState } from "react";

export default function Admin() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    inventory: "",
  });
  const [msg, setMsg] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("Saving...");
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY || "dev-secret-key",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      setMsg(`✅ Product "${data.name}" created successfully!`);
      setForm({ name: "", slug: "", description: "", price: "", category: "", inventory: "" });
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    }
  }

  return (
    <Layout title="Admin">
      <Paper sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" gutterBottom>Admin Panel — Add Product</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {["name", "slug", "category", "price", "inventory", "description"].map((field) => (
              <Grid item xs={12} sm={field === "description" ? 12 : 6} key={field}>
                <TextField
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  multiline={field === "description"}
                  rows={field === "description" ? 3 : 1}
                  required={["name", "slug", "price"].includes(field)}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            fullWidth
          >
            Save Product
          </Button>
        </form>
        {msg && (
          <Alert severity={msg.startsWith("✅") ? "success" : msg.startsWith("❌") ? "error" : "info"} sx={{ mt: 2 }}>
            {msg}
          </Alert>
        )}
      </Paper>
    </Layout>
  );
}
