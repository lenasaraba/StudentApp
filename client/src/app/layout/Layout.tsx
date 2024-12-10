import { Outlet } from "react-router-dom";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { Box, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";

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
        <ThemeSwitcher />
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
