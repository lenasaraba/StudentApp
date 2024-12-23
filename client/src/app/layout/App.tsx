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
  fetchUserCoursesAsync,
} from "../../features/onlineStudy/courseSlice";
import LoadingComponent from "./LoadingComponent";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { fetchProfessorsAsyn } from "../../features/onlineStudy/professorSlice";

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
          primary: "#4D869C",
          secondary: "#89a8b2",
          disabled: "#adbac7",
        },
        action: {
          active: "#89a8b2",
          hover: "#7AB2B2",
          //19334d
          disabled: "#adbac7",
          disabledBackground: "#6b7d8e",
        },
        background: {
          default: "#EEF7FF",
          paper: "#CDE8E5",
        },
        divider: "#CDE8E5",
        primary: { main: "#3a98b9" },
        secondary: { main: "#eef7ff80" },
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
      await dispatch(fetchUserCoursesAsync());
      await dispatch(fetchProfessorsAsyn());
    } catch (error: unknown) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);


  window.scrollTo(0, 0);  // Pomeri na vrh prilikom prve učitavanja stranice
  

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
