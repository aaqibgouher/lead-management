import { Outlet } from "react-router-dom";
import NavbarComponent from "../../components/general/navbar";
import SidebarComponent from "../../components/general/sidebar";

const DashboardLayout = () => {
  return (
    <>
      <div className="container-fluid">
        <NavbarComponent />

        <div style={{ display: "flex", flex: 1 }}>
          <SidebarComponent />

          <div
            style={{
              flex: 1,
              padding: "1rem",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
