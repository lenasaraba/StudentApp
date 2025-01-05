import {
  Box,
  Divider,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchThemesAsync } from "./themeSlice";
import { Fragment, useEffect, useState } from "react";
import ThemeCard from "./components/ThemeCard";
import ThemeCard2 from "./components/ThemeCard2";
import forum from "../../assets/forum.png";
import {
  useForm,
  FormProvider,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./forumpageValidation";
import ForumForm from "./ForumForm";

export default function ForumPage() {

  let methods = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchThemesAsync());
  }, [dispatch]);
  const { themes } = useAppSelector((state) => state.theme);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); // Zatvori modal

  //PRIJEDLOG:
  //DA BUDE I OVDJE KAO NA FORUMU POCETNA NEKA, A ONDA DA IMA KAO SVE TEME, STRANICE I TO, I TEME KOJE JE TAJ KORISNIK KREIRAO
  //POCETNA FINO DA SE UREDI
  //TEMPLEJT ZA FORUM NA TEAMSU
  //POGLEDATI KURS I RADITI SVE STO SE TICE UPLOADA, I NA KURS I NA FORUM

  const newArray = [...(themes || [])];
  const topThemes = newArray
    ?.sort((a, b) => b.messages.length - a.messages.length) // Sortiraj prema broju poruka opadajuće
    .slice(0, 7);
  const firstFourThemes = topThemes.slice(0, 4); // Prvih 4 elementa
  const lastThreeThemes = topThemes.slice(-3);


  

  return (
    <FormProvider {...methods}>
      <Grid
        container
        sx={{
          display: "flex",
          direction: "column",
          margin: 0,
          px: 8,
          pb: 4,
          overflowY: "auto",
        }}
      >
        <Grid item sx={{ ml: 4 }}>
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
          <Typography
            sx={{ fontFamily: "Raleway, sans-serif", ml: 6, fontSize: "20pt" }}
          >
            Postavljajte pitanja ili potražite temu koja vam je potrebna.
          </Typography>
        </Grid>

        <Box
          component="fieldset"
          sx={{
            border: "1px solid",
            px: 0,
            margin: 4,
            width: "100%",
            mb: 4,
            py: 4,
            borderRadius: "20px",
            borderColor: "divider",
          }}
        >
          <Box
            component="legend"
            sx={{ textAlign: "center", color: "text.primary" }}
          >
            NAJPOPULARNIJE
          </Box>
          <Grid container columns={12} sx={{ mb: 4, px: 4 }}>
            {firstFourThemes.map((theme, index) =>
              index < 2 ? (
                <Fragment key={index}>
                  <Grid item xs={6} md={3}>
                    <ThemeCard2 theme={theme} key={index} />
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    md={3}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={forum}
                      style={{ width: "70px", height: "auto" }}
                    />
                  </Grid>
                </Fragment>
              ) : (
                <Fragment key={index}>
                  <Grid
                    item
                    xs={6}
                    md={3}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={forum}
                      style={{ width: "70px", height: "auto" }}
                    />
                  </Grid>

                  <Grid item xs={6} md={3} sx={{}}>
                    <ThemeCard2 theme={theme} key={index} />
                  </Grid>
                </Fragment>
              )
            )}
          </Grid>
          <Divider sx={{ color: "text.primary", width: "100%", px: 8 }}>
            <Typography
              variant="overline"
              gutterBottom
              sx={{ display: "block", fontFamily: "Raleway, sans-serif" }}
            >
              Najnovije
            </Typography>
          </Divider>

          <Grid container columns={12} sx={{ mt: 0, px: 2 }}>
            {lastThreeThemes?.map((theme, index) => (
              <Grid item xs={12} md={4} key={theme.id} sx={{ px: 2 }}>
                <ThemeCard theme={theme} key={index} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            px: 0,
            margin: 4,
            width: "100%",
            mb: 4,
            py: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="button" sx={{ mb: 4 }}>
            ILI
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Raleway, sans-serif",
              color: "text.primary",
              marginBottom: 4,
            }}
          >
            Želite započeti svoju temu? Kliknite dugme ispod!
          </Typography>
          <Button
            onClick={handleOpen}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              padding: "10px 20px",
              borderRadius: "20px",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Započni svoju temu
          </Button>
          <ForumForm open={open} handleClose={handleClose} methods={methods}/>


        </Box>
      </Grid>
    </FormProvider>
  );
}
