import { CssVarsProvider } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import {Typography, Button} from "@mui/joy";
import ForumIcon from "@mui/icons-material/Forum";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { Link, useSearchParams } from "react-router-dom";
import ThemeTable from "./components/ThemeTable";
import { useTheme } from "@mui/material";
import { useAppDispatch } from "../../app/store/configureStore";
import { resetThemesParams } from "./themeSlice";
import { useState } from "react";
// import ThemeList from "./components/ThemeList";

export default function Themes() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const themesType = searchParams.get("type");
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  return (
    <CssVarsProvider disableTransitionOnChange>
      {/* <CssBaseline /> */}
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            gap: 1,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="small" />}
              sx={{ pl:0}}
            >
              {/* <Link
                underline="none"
                color="neutral"
                href="../forum"
                aria-label="Forum"
              > */}
              <Box
                component={Link}
                to="/forum"
                sx={{ display: "flex", alignItems: "center"}}

                onClick={() => dispatch(resetThemesParams())}
              >
                <ForumIcon sx={{
                  color: theme.palette.text.primary,
                  // fontWeight: "bold",
                  
                  "&:hover": {
                    color: theme.palette.action.focus, // Promijeni boju na hover
                  },
                }}/>
              </Box>

              {/* </Link> */}
              <Typography
                component={Typography}
                color="neutral"
                sx={{ fontSize: 12, fontWeight: 500, "&:hover": {
                    color: theme.palette.action.focus, // Promijeni boju na hover
                  },}}
              >
                {themesType === "my" ? "Moje teme" : "Sve teme"}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography
              level="h2"
              component="h1"
              sx={{
                p: 0,
                m: 0,
                color: theme.palette.primary.main,
              }}
            >
              Teme
            </Typography>
            <Button
              component="a"
              href="/createTheme"
              //onClick={handleOpen}
              sx={{
                backgroundColor: theme.palette.primary.dark,
                color: "white",
                padding: "10px 20px",
                borderRadius: "20px",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            >
              <AddIcon />
            </Button>
          </Box>
          <ThemeTable theme={theme} />
          {/* <ThemeList /> */}
          {/* OVO SE NE PRIKAZUJE NA LAPTOPU, ALI FINO IZGLEDA, POGLEDATI */}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
