import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutApiHelper } from "../../../apiHelper/auth";
import { removeData } from "../../../utils/common";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await logoutApiHelper();

      if (!res || res?.status !== 200) throw "Something went wrong";

      // store user info to localstorage
      removeData("userData");
      removeData("configs");

      // redirect to dashboard
      navigate("/login");
    } catch (error) {
      console.log("NavbarComponent - logout:", error);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-light"
        style={{ padding: "15px", borderBottom: "1px solid #ddd" }}
      >
        <div className="container-fluid">
          {/* Logo */}
          <NavLink to="/">
            <img
              src="https://img.udaan.com/v2/f_auto,q_auto:best,w_240/u/assets/rzwrk99l4a2002pin6gb.png"
              alt="Logo"
              height="60px"
              width="auto"
            />
          </NavLink>

          {/* #fbd4d0 */}
          {/* Navbar items */}
          <div className="d-flex ms-auto align-items-center">
            <div className="d-flex align-items-center">
              <button type="button" className="btn custom-btn">
                <i
                  className="bi bi-people"
                  style={{
                    color: "#d73c46",
                    fontSize: "24px",
                    transition: "color 0.3s ease",
                  }}
                ></i>
              </button>

              <button
                type="button"
                className="btn custom-btn"
                style={{
                  color: "#d73c46",
                  fontSize: "24px",
                  transition: "color 0.3s ease",
                }}
                onClick={logout}
              >
                <i
                  className="bi bi-box-arrow-right"
                  style={{
                    color: "#d73c46",
                    fontSize: "24px",
                    transition: "color 0.3s ease",
                  }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
