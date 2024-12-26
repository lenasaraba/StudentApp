import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchThemesAsync } from "./themeSlice";
import { useEffect, useState } from "react";
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

  //UBACITI SVE OVO ZA CARD U THEME CARD PA DA SE UCITAVA TA KOMPONENTA

  const [cardSizes, setCardSizes] = useState<number[]>([]); // Inicijalizuj kao praznu listu

  useEffect(() => {
    if (themes) {
      // Generisanje nasumičnih veličina za kartice
      const sizes = themes
        .slice(0, 5)
        .map(() => Math.floor(Math.random() * 150) + 100); // veličine od 100 do 250px
      setCardSizes(sizes);
    }
  }, [themes]);

  return (
    <Grid container sx={{ display: "flex", direction: "column", margin: 0 }}>
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
        <Typography sx={{ fontFamily: "Raleway, sans-serif", ml: 6 }}>
          Postavljajte pitanja ili potražite temu koja vam je potrebna.
        </Typography>
      </Grid>
      {/* <Grid container spacing={4}
            columns={12}
            sx={{ margin: 4, paddingBottom: 4}}>
          {themes?.map((theme, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              {" "}
              <ThemeCard theme={theme} />
            </Grid>
          ))}
        </Grid> */}
      <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Tri kolone
        gridAutoRows: 'minmax(100px, auto)', // Automatski visina koja se prilagođava
        gap: 0, // Nema razmaka između kartica
        width: '100%', // Širina kontejnera
        height: '400px', // Fiksna visina za veći kvadrat
      }}
    >
      {themes?.slice(0, 5).map((theme) => (
        <>
        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }} key={theme.id}>
        <CardContent>
          <Typography component="h2" variant="subtitle2" gutterBottom>
            {theme.title}
          </Typography>
          <Stack direction="column" sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}>
            <Stack sx={{ justifyContent: 'space-between' }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="p">
                  {theme.description}
                </Typography>
                <Chip size="small" sx={{color: 'blue'}} label={theme.title}/>
              </Stack>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {theme.date}
              </Typography>
            </Stack>
           
          </Stack>
        </CardContent>
      </Card>





        {/* <Card
          key={theme.id}
          sx={{
            width: `${cardSizes[index]}px`,
            height: `${cardSizes[index]}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            gridRowEnd: `span ${Math.ceil(cardSizes[index] / 100)}`, // Visina kartice utiče na red
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              {theme.title}
            </Typography>
          </CardContent>
        </Card> */}
        </>
      ))}
    </Box>
    </Grid>
    
  );
}
