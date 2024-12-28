import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      style={{
        backgroundImage: `url("https://auth.udaan.com/images/bg-desktop.1f41d59e29f4cfa239077d55cb4730cf.png")`,
        backgroundSize: "contain", // Prevent zoom by ensuring the image fits without distortion
        backgroundPosition: "center", // Keep the image centered
        backgroundRepeat: "no-repeat", // Prevent the image from repeating
        minHeight: "100vh", // Make sure the layout takes full viewport height
        backgroundColor: "rgb(239, 239, 244)",
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
