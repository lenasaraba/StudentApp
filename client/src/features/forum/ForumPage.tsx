import {
  Box,
  Divider,
  Grid,
  Typography,
  Button,
  Modal,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchThemesAsync } from "./themeSlice";
import { Fragment, useEffect, useState } from "react";
import ThemeCard from "./components/ThemeCard";
import ThemeCard2 from "./components/ThemeCard2";
import forum from "../../assets/forum.png";
import React from "react";
import { useForm, Controller } from "react-hook-form";

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

  //UBACITI SVE OVO ZA CARD U THEME CARD PA DA SE UCITAVA TA KOMPONENTA

  const newArray = [...(themes || [])];
  const topThemes = newArray
    ?.sort((a, b) => b.messages.length - a.messages.length) // Sortiraj prema broju poruka opadajuće
    .slice(0, 7);
  const firstFourThemes = topThemes.slice(0, 4); // Prvih 4 elementa
  const lastThreeThemes = topThemes.slice(-3);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [courseId, setCourseId] = useState(null); // Da pratimo odabrani kurs
  const [isFreeTopic, setIsFreeTopic] = useState(false);
  const onSubmit = (data: unknown) => {
    console.log(data);
    // Ovde možeš slati podatke na backend ili obraditi ih
  };

  return (
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
                <Grid item xs={6} md={3} sx={{}}>
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
                  <img src={forum} style={{ width: "70px", height: "auto" }} />
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
                  <img src={forum} style={{ width: "70px", height: "auto" }} />
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
        <Modal open={open} onClose={handleClose}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              height: "100%",
              margin: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                width: "100%",
                maxWidth: "600px",
                margin: "auto",
                padding: 6,
                backgroundColor: "background.default",
                borderRadius: "20px",
                border: "2px solid",
                borderColor: "primary.main",
              }}
            >
              {/* Naziv */}
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Naslov je obavezan" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Naziv"
                      variant="outlined"
                      fullWidth
                      error={!!errors.title}
                      helperText={
                        errors.title ? errors.title.message?.toString() : ""
                      }
                    />
                  )}
                />
              </Grid>

              {/* Opis */}
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Opis je obavezan" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Opis"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={
                        errors.description
                          ? errors.description.message?.toString()
                          : ""
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isFreeTopic}
                      onChange={(e) => {
                        setIsFreeTopic(e.target.checked);
                        setValue("courseId", ""); // Ako je slobodna tema, postavi courseId na null
                      }}
                      color="primary"
                    />
                  }
                  label="Slobodna tema"
                />
              </Grid>
              {/* Kurs */}
              <Grid item xs={12}>
                <FormControl fullWidth disabled={isFreeTopic}>
                  {" "}
                  {/* Onemogući kurs ako je slobodna tema označena */}
                  <InputLabel id="courseId-label">Kurs</InputLabel>
                  <Controller
                    name="courseId"
                    control={control}
                    defaultValue=""
                    rules={{ required: !isFreeTopic && "Kurs je obavezan!" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="courseId-label"
                        label="Kurs"
                        onChange={(e) => {
                          setCourseId(e.target.value);
                          setValue("courseId", e.target.value || ""); // Ako je prazno, postavi null
                        }}
                      >
                        <MenuItem value="">Nema kursa</MenuItem>
                        <MenuItem value={1}>Kurs 1</MenuItem>
                        <MenuItem value={2}>Kurs 2</MenuItem>
                        <MenuItem value={3}>Kurs 3</MenuItem>
                        {/* Dodaj ovde ostale kurseve prema potrebi */}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              {/* Dugme za submit */}
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Pošaljite
                </Button>
              </Grid>
            </Grid>
          </form>
        </Modal>
      </Box>
    </Grid>
  );
}
