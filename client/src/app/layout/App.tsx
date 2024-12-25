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
import { fetchCoursesAsync } from "../../features/onlineStudy/courseSlice";
import LoadingComponent from "./LoadingComponent";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { fetchProfessorsAsync } from "../../features/onlineStudy/professorSlice";
import { fetchThemesAsync } from "../../features/forum/themeSlice";
import { fetchMessagesAsync } from "../../features/forum/messageSlice";

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

// const { palette } = createTheme();
// const theme = createTheme({
//   palette: {
//     myAwesomeColor: palette.augmentColor({ color: purple }),
//     // Use this code if you want to use an arbitrary color// myAwesomeColor: palette.augmentColor({//   color: {//     main: "#00ff00"//   }// })
//   },
// });

const demoTheme = extendTheme({
  colorSchemes: {
    // light: {
    //   palette: {
    //     text: {
    //       primary: "#4D869C",
    //       secondary: "#89a8b2",
    //       disabled: "#adbac7",
    //     },
    //     action: {
    //       active: "#89a8b2",
    //       hover: "#7AB2B2",
    //       //19334d
    //       disabled: "#adbac7",
    //       disabledBackground: "#6b7d8e",
    //     },
    //     background: {
    //       default: "#EEF7FF",
    //       // paper: "#CDE8E5",
    //       paper: "#81BFDA",
    //     },
    //     divider: "#CDE8E5",
    //     primary: { main: "#3a98b9" },
    //     secondary: { main: "#eef7ff80" },
    //     common:{
    //       background:"#6096B4",
    //       white: "#ffffff",
    //       black: "#201E43",
    //       onBackground:"#AFD3E2",
    //       backgroundChannel:"#67C6E3"
    //     }
    //   },
    // },
    light: {
      palette: {
        text: {
          primary: "#2e3b4e", // tamno siva-plava za osnovni tekst
          secondary: "#556070", // prigušena siva za sekundarni tekst
          disabled: "#a0aab4", // svetlija nijansa za onemogućeni tekst
        },
        action: {
          active: "#5a7d9a", // blago plava za aktivne elemente
          hover: "#f0f4f8", // veoma svetla siva-plava za hover efekat
          disabled: "#c7d0d9", // prigušena siva za onemogućene elemente
          disabledBackground: "#e9eef2", // veoma svetla pozadina za onemogućene elemente
        },
        background: {
          default: "#f7f9fc", // nežno svetlo siva za pozadinu
          paper: "#e3edf5", // blago plava za kartice i slične elemente
        },
        divider: "#e3edf5", // prigušena svetlo siva za linije razdvajanja
        primary: { main: "#89a8b2" }, // neutralna plava kao primarna boja
        secondary: { main: "#c4d4e180" }, // svetlo siva-plava kao sekundarna
        // common: {
        //   background: "#e0ecf4", // blago plava za pozadinske akcente
        //   white: "#f2f5f9", // prigušena bela
        //   black: "#2b3a4a", // tamno siva-plava
        //   onBackground: "#607890", // prigušena plava za tekst na pozadini
        //   backgroundChannel: "#dce5ee", // svetla pastelna plava za naglašavanje
        // },
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
        },
        action: {
          active: "#89a8b2",
          hover: "#0c1017",
          //19334d
          disabled: "#6c859d",
          disabledBackground: "#ced4da",
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

export default function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchCoursesAsync());
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
