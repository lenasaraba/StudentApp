import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function App() {
  
  const [darkMode, setDarkMode]=useState(false);
  const paletteType=darkMode ? 'dark':'light';


  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType==='light'? '#F3F3E0' :'#1E3E62'
      },
    }
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header theme={theme} handleThemeChange={handleThemeChange} />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

