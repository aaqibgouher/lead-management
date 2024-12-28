import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../general/toast";
import {
  getConfigsApiHelper,
  registerApiHelper,
} from "../../../apiHelper/auth";
import { setData } from "../../../utils/common";

const RegisterAuthComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

  const register = async () => {
    try {
      const res = await registerApiHelper(formData);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // store user info to localstorage
      setData("userData", res?.data?.response);

      // get configs
      await getConfigs();

      // redirect to dashboard
      navigate("/");
    } catch (error) {
      console.log("RegisterAuthComponent - Error", error);
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
        <h5 className="text-center">Register</h5>
        <small className="text-center" style={{ color: "rgb(129, 129, 129)" }}>
          Enter following details to register yourself ...
        </small>

        {/* form */}
        <div className="mt-4">
          <small className="fw-bold" style={{ color: "rgb(129, 129, 129)" }}>
            Name
          </small>
          <input
            type="text"
            className="form-control form-control-sm"
            id="name"
            placeholder="Eg: John Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
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
            Phone
          </small>
          <input
            type="text"
            className="form-control form-control-sm"
            id="phone"
            placeholder="Eg: XXXXXXX899"
            value={formData.phone}
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
        <div className="mt-2">
          <small className="fw-bold" style={{ color: "rgb(129, 129, 129)" }}>
            Confirm Password
          </small>
          <input
            type="password"
            className="form-control form-control-sm"
            id="confirmPassword"
            placeholder="Eg: ******"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button
          type="button"
          className="btn mt-3"
          style={{ backgroundColor: "rgb(215, 60, 70)", color: "white" }}
          onClick={register}
        >
          Submit
        </button>

        {/* Already have an account? */}
        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "rgb(215, 60, 70)" }}>
              Login here
            </Link>
          </small>
        </div>
      </div>
    </>
  );
};

export default RegisterAuthComponent;
