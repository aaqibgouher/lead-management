import { Link, useNavigate } from "react-router-dom";
import { getConfigsApiHelper, loginApiHelper } from "../../../apiHelper/auth";
import { useState } from "react";
import { setData } from "../../../utils/common";

const LoginAuthComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const getConfigs = async () => {
    try {
      const res = await getConfigsApiHelper();

      if (!res || res?.status !== 200) throw "Something went wrong";

      setData("configs", res?.data?.response);
    } catch (error) {
      console.log("DashboardComponent - getStats", error);
    }
  };

  const login = async () => {
    try {
      const res = await loginApiHelper(formData);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // store user info to localstorage
      setData("userData", res?.data?.response);

      // get configs
      await getConfigs();

      // redirect to dashboard
      navigate("/");
    } catch (error) {
      console.log("LoginAuthComponent - Error", error);
    }
  };

  return (
    <>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="d-flex justify-content-center mb-4">
          <img
            src="https://auth.udaan.com/images/title-mobile-input-v2.a635f3b813593e295a848e4072cc559f.png"
            alt="Logo"
            height="150px"
            width="150px"
          />
        </div>
        <h5 className="text-center">Login</h5>
        <small className="text-center" style={{ color: "rgb(129, 129, 129)" }}>
          Enter following details to register yourself ...
        </small>

        {/* form */}
        <div className="mt-2">
          <small className="fw-bold" style={{ color: "rgb(129, 129, 129)" }}>
            Email
          </small>
          <input
            type="email"
            className="form-control form-control-sm"
            id="email"
            placeholder="Eg: john@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mt-2">
          <small className="fw-bold" style={{ color: "rgb(129, 129, 129)" }}>
            Password
          </small>
          <input
            type="password"
            className="form-control form-control-sm"
            id="password"
            placeholder="Eg: ******"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="button"
          className="btn mt-3"
          style={{ backgroundColor: "rgb(215, 60, 70)", color: "white" }}
          onClick={login}
        >
          Submit
        </button>

        {/* Already have an account? */}
        <div className="text-center mt-3">
          <small>
            New at Udaan, create an account?{" "}
            <Link to="/register" style={{ color: "rgb(215, 60, 70)" }}>
              Register here
            </Link>
          </small>
        </div>
      </div>
    </>
  );
};

export default LoginAuthComponent;
