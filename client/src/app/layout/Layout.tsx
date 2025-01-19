import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Box, Button, IconButton, useColorScheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";
import React from "react";
import NightsStayTwoToneIcon from "@mui/icons-material/NightsStayTwoTone";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
function CustomThemeToggle(): JSX.Element {
  const { mode, setMode } = useColorScheme();

  const toggleTheme = React.useCallback(() => {
    if (setMode) {
      setMode(mode === "light" ? "dark" : "light");
    }
  }, [mode, setMode]);

  return (
    <IconButton
      type="button"
      aria-label="toggle theme"
      onClick={toggleTheme}
      color="inherit"
    >
      {mode !== "light" ? (
        <LightModeTwoToneIcon sx={{ color: "#608bc1" }} />
      ) : (
        <NightsStayTwoToneIcon sx={{ color: "#89a8b2" }} />
      )}
    </IconButton>
  );
}
export default function Layout() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  function sideMenu() {
    return (
      <>
        {user && (
          <Button
            onClick={() => {
              dispatch(signOut());
            }}
          >
            <LogoutIcon />
          </Button>
        )}
        <CustomThemeToggle />
      </>
    );
  }
  return (
    <DashboardLayout
      sx={{ padding: 0 }}
      defaultSidebarCollapsed
      slots={{
        toolbarActions: sideMenu,
      }}
    >
      {/* <PageContainer> */}
      <Box
        sx={{
          overflowY: "auto",
          height: "100vh",
          display: "flex",
        }}
      >
        <Outlet />
      </Box>

      {/* </PageContainer> */}
    </DashboardLayout>
  );
}
