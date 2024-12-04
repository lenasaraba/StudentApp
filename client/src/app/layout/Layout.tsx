import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

export default function Layout() {
  return (
    <DashboardLayout defaultSidebarCollapsed>
      {/* <PageContainer> */}
      <Outlet />
      {/* </PageContainer> */}
    </DashboardLayout>
  );
}
