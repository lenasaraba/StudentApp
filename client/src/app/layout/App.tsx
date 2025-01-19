import { extendTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppProvider } from "@toolpad/core/react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ForumIcon from "@mui/icons-material/Forum";
import type { Navigation } from "@toolpad/core";
import { useAppDispatch } from "../store/configureStore";
import { useCallback, useEffect, useState } from "react";
import {
  fetchCoursesAsync,
  fetchCoursesListAsync,
} from "../../features/onlineStudy/courseSlice";
import LoadingComponent from "./LoadingComponent";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { fetchProfessorsAsync } from "../../features/onlineStudy/professorSlice";
import { fetchThemesAsync } from "../../features/forum/themeSlice";
import { fetchMessagesAsync } from "../../features/forum/messageSlice";
import "./app.css"; //
const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Meni",
  },
  {
    segment: "",
    title: "Početna",
    icon: <HomeIcon />,
  },
  {
    //provjeriti segment
    segment: "onlineStudy",
    title: "Online učenje",
    icon: <AutoStoriesIcon />,
  },
  {
    //provjera
    segment: "profile",
    title: "Profil",
    icon: <PersonOutlineIcon />,
  },
  {
    segment: "forum",
    title: "Forum",
    icon: <ForumIcon />,
  },
  {
    segment: "etfis",
    title: "ETFIS",
    icon: <LaunchIcon />,
  },
  {
    segment: "about",
    title: "O nama",
    icon: <InfoIcon />,
  },
];

const BRANDING = {
  title: "StudentApp",
  logo: <SchoolIcon sx={{ fontSize: "2rem" }} />,
};

const demoTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: "#2e3b4e", // tamno siva-plava za osnovni tekst
          secondary: "#556070", // prigušena siva za sekundarni tekst
          disabled: "#a0aab4", // svetlija nijansa za onemogućeni tekst
          primaryChannel: "#9EDF9C", //zelena
          secondaryChannel: "#D84040", //crvena
        },
        action: {
          active: "#5a7d9a", // blago plava za aktivne elemente
          hover: "#f0f4f8", // veoma svetla siva-plava za hover efekat
          disabled: "#c7d0d9", // prigušena siva za onemogućene elemente
          disabledBackground: "#e9eef2", // veoma svetla pozadina za onemogućene elemente
          focus: "#D0E8F2",
        },
        background: {
          default: "#f7f9fc", // nežno svetlo siva za pozadinu
          paper: "#e3edf5", // blago plava za kartice i slične elemente
          // defaultChannel: "red",
          // paperChannel: "red",
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
        Tooltip: {
          bg: "#89a8b2",
        },
      },
    },

    dark: {
      palette: {
        text: {
          primary: "#c4e1f6",
          secondary: "#89a8b2",
          disabled: "#6c859d",
          primaryChannel: "#355F2E",
          secondaryChannel: "#8E1616",
        },
        action: {
          active: "#89a8b2",
          hover: "#0c1017",
          //19334d
          disabled: "#6c859d",
          disabledBackground: "#ced4da",
          focus: "#2E5077",
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
        Tooltip: {
          bg: "#608bc1",
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

export default function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchCoursesAsync());
      await dispatch(fetchCoursesListAsync());

      //await dispatch(fetchUserCoursesAsync());
      await dispatch(fetchProfessorsAsync());
      await dispatch(fetchThemesAsync());
      await dispatch(fetchMessagesAsync());
    } catch (error: unknown) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  window.scrollTo(0, 0); // Pomeri na vrh prilikom prve učitavanja stranice

  if (loading)
    return <LoadingComponent message="Učitavanje..."></LoadingComponent>;

  // const dispatch = useAppDispatch();
  // const [loading, setLoading] = useState(true);

  // const initApp = useCallback(async () => {
  //   try {
  //     await dispatch(fetchCurrentUser());
  //     await dispatch(fetchBasketAsync());
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   initApp().then(() => setLoading(false));
  // }, [initApp]);
  // if (loading)
  //   return (
  //     <LoadingComponent message="Initializing app..."></LoadingComponent>
  //   );

  return (
    <>
      {/* <ThemeProvider theme={demoTheme}> */}

      <AppProvider
        theme={demoTheme}
        navigation={NAVIGATION}
        branding={BRANDING}
      >
        <Outlet />
        {/* <ScrollRestoration/> */}
      </AppProvider>
      {/* </ThemeProvider> */}
    </>
  );
}
