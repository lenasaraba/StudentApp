import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";

//STAVITI FIKSNI HEIGHT ZBOG APPAPPBARA

export default function AppAppBar() {
  return (
    <AppBar
      //ne radi sticky
      position="sticky"
      enableColorOnDark
      sx={{
        top: 30,
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
        textAlign: "center",
        padding: 0,
        minHeight: 0,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          direction: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Toolbar
          disableGutters
          variant="dense"
          sx={{
            borderRadius: "22px",
            // backdropFilter: "blur(36px)",
            backgroundColor: "secondary.main",
            border: "1px solid ",
            borderColor: "text.secondary",
            padding: "0",
            width: "60%",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              px: 0,
              justifyContent: "space-evenly",
              margin: 0,
              minHeight: 0,
            }}
          >
            <Box
              component={Link}
              to="/onlineStudy"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <SchoolIcon
                sx={{
                  color: "text.secondary",
                  fontWeight: "bold",
                  margin: 0,
                  padding: 0,
                }}
              />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                margin: 0,
                padding: 0,
              }}
            >
              <Button
                variant="text"
                size="small"
                sx={{ color: "text.primary", fontWeight: "bold" }}
                component={Link}
                to="/courses?type=all"
              >
                Svi kursevi
              </Button>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                margin: 0,
                padding: 0,
              }}
            >
              <Button
                variant="text"
                size="small"
                sx={{ color: "text.primary", fontWeight: "bold" }}
                component={Link}
                to="/courses?type=my"
              >
                Moje učenje
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
