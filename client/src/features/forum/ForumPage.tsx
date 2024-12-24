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



  //PRIJEDLOG:
  //DA BUDE I OVDJE KAO NA FORUMU POCETNA NEKA, A ONDA DA IMA KAO SVE TEME, STRANICE I TO, I TEME KOJE JE TAJ KORISNIK KREIRAO
  //POCETNA FINO DA SE UREDI
  //KAO STAVITI DA SE VIDI NA POCETKU NEKA TEMA SA NAJVISE PORUKA U NJOJ 
  //TEMPLEJT ZA FORUM NA TEAMSU
  //POGLEDATI KURS I RADITI SVE STO SE TICE UPLOADA, I NA KURS I NA FORUM
  

  return (
    <Grid container sx={{ display: "flex", direction: "column", margin: 0 }}>

        <Grid item sx={{ml:4}}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontFamily: "Raleway, sans-serif",
              paddingTop: 4,
              color: "text.primary",
              ml: 6,
            }}
          >
            Dobrodošli na studentski forum!
          </Typography>
          <Typography sx={{ fontFamily: "Raleway, sans-serif", ml: 6 }}>
            Postavljajte pitanja ili potražite temu koja vam je potrebna.
          </Typography>
        </Grid>
        <Grid container spacing={4}
            columns={12}
            sx={{ margin: 4, paddingBottom: 4}}>
          {themes?.map((theme, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              {" "}
              <ThemeCard theme={theme} />
            </Grid>
          ))}
        </Grid>
    </Grid>
  );
}
