import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Theme } from "../../../app/models/theme";

interface ThemeCardProps {
  theme: Theme;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        {/* Naslov teme */}
        <Typography variant="h6" component="div" gutterBottom>
          {theme.title}
        </Typography>

        {/* Opis teme */}
        {theme.description && (
          <Typography variant="body2" color="text.secondary" paragraph>
            {theme.description}
          </Typography>
        )}

        {/* Informacije o korisniku */}
        {theme.user && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Postavio: {theme.user?.firstName + " " + theme.user?.lastName}
              {/* Pretpostavljamo da 'Name' postoji u UserDto */}
            </Typography>
          </Box>
        )}

        {/* Datum */}
        <Typography variant="caption" color="text.secondary">
          {new Date(theme.date).toLocaleDateString()}{" "}
          {/* Formatiranje datuma */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ThemeCard;
