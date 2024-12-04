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
          primary: "#3a98b9",
          secondary: "#89a8b2",
          disabled: "#000000",
        },
        action: {
          active: "#89a8b2",
          hover: "#f3e6d8",
          //hoverselected: "rgba(255, 0, 0, 0.16)",
          disabled: "rgba(255, 0, 0, 0.3)",
          disabledBackground: "rgba(255, 0, 0, 0.12)",
        },
        background: {
          default: "#f3e6d8",
          paper: "#eedbc9",
        },
        divider: "#eedbc9",
        primary: { main: "#3a98b9" },
      },
    },
    dark: {
      palette: {
        text: {
          primary: "#c4e1f6",
          secondary: "#89a8b2",
          disabled: "#000000",
        },
        action: {
          active: "#89a8b2",
          hover: "#0c1017",
          //hoverselected: "rgba(255, 0, 0, 0.16)",
          disabled: "rgba(255, 0, 0, 0.3)",
          disabledBackground: "rgba(255, 0, 0, 0.12)",
        },
        background: {
          default: "#0c1017",
          paper: "#212a3e",
        },
        divider: "#212a3e",
        primary: { main: "#37b7c3" },
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
      <AppProvider
        theme={demoTheme}
        navigation={NAVIGATION}
        branding={BRANDING}
      >
        <Outlet />
      </AppProvider>
    </>
  );
}
