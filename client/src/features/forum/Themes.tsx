import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ForumIcon from "@mui/icons-material/Forum";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../app/store/configureStore";
import ThemeTable from "./components/ThemeTable";

export default function Themes() {
  const [searchParams] = useSearchParams();
  const themesType = searchParams.get("type");
  const dispatch = useAppDispatch();

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex"}}>
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
            pb: { xs: 2, sm: 2, md: 3},
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="small" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="../forum"
                aria-label="Forum"
              >
                <ForumIcon />
              </Link>
              <Typography
                component={Typography}
                color="neutral"
                sx={{ fontSize: 12, fontWeight: 500 }}
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
            <Typography level="h2" component="h1" sx={{p:0, m:0}}>
              Teme
            </Typography>
          </Box>
          <ThemeTable />
          {/* <ThemeList /> */}
          {/* OVO SE NE PRIKAZUJE NA LAPTOPU, ALI FINO IZGLEDA, POGLEDATI */}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
