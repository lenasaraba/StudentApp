import {
  Backdrop,
  Box,
  CircularProgress,
  extendTheme,
  Typography,
} from "@mui/material";

interface Props {
  message?: string;
}

export default function LoadingComponent({ message = "Loading..." }: Props) {
  const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
  
          text: {
            primary: "#2e3b4e", // tamno siva-plava za osnovni tekst
            secondary: "#556070", // prigušena siva za sekundarni tekst
            disabled: "#a0aab4", // svetlija nijansa za onemogućeni tekst
            primaryChannel:"#9EDF9C", //zelena
            secondaryChannel:"#D84040", //crvena
  
          },
          action: {
            active: "#5a7d9a", // blago plava za aktivne elemente
            hover: "#f0f4f8", // veoma svetla siva-plava za hover efekat
            disabled: "#c7d0d9", // prigušena siva za onemogućene elemente
            disabledBackground: "#e9eef2", // veoma svetla pozadina za onemogućene elemente
            focus:"#D0E8F2"
          },
          background: {
            default: "#f7f9fc", // nežno svetlo siva za pozadinu
            paper: "#e3edf5", // blago plava za kartice i slične elemente
          },
          divider: "#e3edf5", // prigušena svetlo siva za linije razdvajanja
          primary: { main: "#89a8b2" }, // neutralna plava kao primarna boja
          secondary: { main: "#c4d4e180" }, // svetlo siva-plava kao sekundarna
          
          common: {
            background: "#d9ebf4", // nežno pastelno plava za pozadinu poruka
            white: "#334b5e", // tamna plava-siva za tekst poruka
            black: "#1a2b3c", // još tamnija nijansa za istaknuti tekst ili naslove
            onBackground: "#6b8ca1", // svetlija prigušena plava za sekundarni tekst
            backgroundChannel: "#c4dae6", // mekana pastelna plava za naglašene delove u poruci
          },
          
        },
      },
      dark: {
        palette: {
          text: {
            primary: "#c4e1f6",
            secondary: "#89a8b2",
            disabled: "#6c859d",
            primaryChannel:"#355F2E",
            secondaryChannel:"#8E1616"
          },
          action: {
            active: "#89a8b2",
            hover: "#0c1017",
            //19334d
            disabled: "#6c859d",
            disabledBackground: "#ced4da",
            focus:"#2E5077"
          },
          background: {
            default: "#0c1017",
            paper: "#212a3e",
          },
          divider: "#212a3e",
          primary: { main: "#608bc1" },
          secondary: { main: "#0c101780" },
          common: {
            background: "#212a3e", // Pozadina poruka
            white: "#ffffff", // Tekst na tamnim površinama
            black: "#ffffff", // Tekst na svetlim površinama
            onBackground: "#8faecc", // Tekst na kanalima i istaknuti elementi
            backgroundChannel: "#2a415b", // Sekundarne pozadine
          },
        },
      },
    },
    colorSchemeSelector: "class",
    defaultColorScheme: localStorage.getItem("toolpad-mode")
      ? localStorage.getItem("toolpad-mode")?.toString() == "light"
        ? "light"
        : "dark"
      : "dark",
  });
  return (
    <Backdrop
      open={true}
      invisible={true}
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress
          size={100}
          sx={{ color: theme.palette.text.secondary }}
        ></CircularProgress>
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}
