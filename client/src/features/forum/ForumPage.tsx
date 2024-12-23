import { Box, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchThemesAsync } from "./themeSlice";
import { useEffect } from "react";
import ThemeCard from "./components/ThemeCard";

export default function ForumPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchThemesAsync());
  }, [dispatch]);
  const { themes } = useAppSelector((state) => state.theme);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        direction: "column",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, margin: 0 }}>
        <div>
          <Typography
            variant="h2"
            gutterBottom
            sx={{ fontFamily: "Raleway, sans-serif", paddingTop: 4 }}
          >
            Dobrodošli na studentski forum!
          </Typography>
          <Typography sx={{ fontFamily: "Raleway, sans-serif" }}>
            Postavljajte pitanja ili potražite temu koja vam je potrebna.
          </Typography>
        </div>
        <Grid container spacing={2}>
          {themes?.map((theme, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              {" "}
              <ThemeCard theme={theme} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
}
