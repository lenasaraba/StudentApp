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
            primary: "#4D869C",
            secondary: "#89a8b2",
            disabled: "#19334d",
          },
          action: {
            active: "#89a8b2",
            hover: "#7AB2B2",
            disabled: "#19334d",
            disabledBackground: "#b3b3b3",
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
            disabled: "#19334d",
          },
          action: {
            active: "#89a8b2",
            hover: "#0c1017",
            disabled: "#19334d",
            disabledBackground: "#b3b3b3",
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
  return (
    <Backdrop
      open={true}
      invisible={true}
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
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
