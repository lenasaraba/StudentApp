import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container
      component={Paper}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        my: 5,
      }}
    >
      <Typography gutterBottom variant="h3">
        Ups - Nismo mogli pronaći ono što tražiš.
      </Typography>
      <Divider />
      <Button component={Link} to="/">
        Vrati se na početak
      </Button>
    </Container>
  );
}
