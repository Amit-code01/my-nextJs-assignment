// components/Layout.js
import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import Link from "next/link";

export default function Layout({ title = "Next E-Store", children }) {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Next E-Store
          </Typography>
          <div>
            <Button color="inherit" component={Link} href="/">Home</Button>
            <Button color="inherit" component={Link} href="/dashboard">Dashboard</Button>
            <Button color="inherit" component={Link} href="/admin">Admin</Button>
          </div>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4 }}>{children}</Container>
    </>
  );
}
