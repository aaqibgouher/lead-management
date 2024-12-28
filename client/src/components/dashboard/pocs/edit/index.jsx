import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editPocApiHelper,
  getPocByIdApiHelper,
} from "../../../../apiHelper/poc";
import { getConfigByKey } from "../../../../utils/common";

const EditPocComponent = () => {
  const navigate = useNavigate();
  const roles = getConfigByKey("POCS_ROLE");
  const status = getConfigByKey("STATUS_CONSTANTS");

  const { pocId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "ACTIVE",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getPocById = async () => {
    try {
      const res = await getPocByIdApiHelper(pocId);

      if (!res || res?.status !== 200) throw "Something went wrong";

      const pocData = res?.data?.response;

      // prefill
      setFormData({
        name: pocData?.name || "",
        email: pocData?.email || "",
        phone: pocData?.phone || "",
        role: pocData?.role || "",
        status: pocData?.status || "",
      });
    } catch (error) {
      console.log("DashboardComponent - getStats", error);
    }
  };

  const editPoc = async () => {
    try {
      const res = await editPocApiHelper(pocId, formData);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // added, redirect to list page
      navigate("/poc");
    } catch (error) {
      console.log("EditPocComponent - editPoc", error);
    }
  };

  useEffect(() => {
    if (pocId) {
      getPocById();
    }
  }, [pocId]);

  return (
    <>
      <div className="container my-2">
        <div
          className="mb-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          <div>Edit POC</div>
        </div>

        {/* Form */}
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select roles</option>
              {Object.values(roles)?.length ? (
                Object.values(roles).map((role) => (
                  <option value={role.value} key={role.value}>
                    {role.label}
                  </option>
                ))
              ) : (
                <option value="">No roles</option>
              )}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select status</option>
              {Object.values(status)?.length ? (
                Object.values(status).map((sta) => (
                  <option value={sta} key={sta}>
                    {sta}
                  </option>
                ))
              ) : (
                <option value="">No roles</option>
              )}
            </select>
          </div>
        </div>

        <button
          type="button"
          className="btn"
          style={{ background: "#d73c46", color: "white" }}
          onClick={editPoc}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default EditPocComponent;
