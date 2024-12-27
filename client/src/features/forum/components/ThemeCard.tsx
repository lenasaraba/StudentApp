import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { Theme } from "../../../app/models/theme";
import { Link } from "react-router-dom";

interface ThemeCardProps {
  theme: Theme;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", padding: 0 }}>
      <Card
        component={Link}
        to={`/forum/${theme.id}`}
        sx={{
          width: "100%" /* Postavlja karticu da zauzme 100% širine roditelja */,
          boxSizing: "border-box",
          borderRadius: "20px",
          padding: 0,
          textDecoration: "none",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: (theme) => `0px 2px 18px ${theme.palette.text.primary}`,
            color: "primary.main",
          },
          "&:visited": {
            color: "text.primary", // Zadrži istu boju za visited linkove
          },
          "&:active": {
            color: "text.primary", // Zadrži istu boju pri aktivnom linku
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            margin: 0,
          }}
        >
          <Avatar
            sx={{
              textAlign: "center",
              bgcolor: "primary.main",
              height: 70,
              width: 70,
              margin: 0,
            }}
          >
            <Box sx={{ textAlign: "center", fontSize: "25pt", margin: 0 }}>
              {theme.title.charAt(0).toUpperCase()}
            </Box>
          </Avatar>

          <Typography
            component={Link}
            to={`/forum/${theme.id}`}
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18pt",
              fontFamily: "Raleway, sans-serif",
              textDecoration: "none", // Uklanja podvlačenje linka
              color: "text.primary", // Koristi boju teksta iz roditeljskog elementa
              "&:visited": {
                color: "text.primary", // Zadrži istu boju za visited linkove
              },
              "&:hover": {
                color: "primary.main", // Zadrži istu boju pri hover-u
              },
              "&:active": {
                color: "text.primary", // Zadrži istu boju pri aktivnom linku
              },
            }}
          >
            {theme.title}
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              fontSize: "12pt",
              color: "text.secondary",
              fontFamily: "Raleway, sans-serif",
            }}
          >
            Autor: {theme.user.firstName}
          </Typography>
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Opis: <br />{" "}
          </Typography>
          <Typography sx={{ color: "text.primary" }}>
            {theme.description}
          </Typography>

          <Typography variant="caption" display="block" mt={1}>
            Broj poruka: {theme.messages.length}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
