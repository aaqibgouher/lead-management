import { useEffect, useState } from "react";
import { getConfigByKey } from "../../../../utils/common";
import {
  addLeadApiHelper,
  getLeadsApiHelper,
} from "../../../../apiHelper/leads";
import { useNavigate } from "react-router-dom";
import { addPocApiHelper } from "../../../../apiHelper/poc";

const AddPocComponent = () => {
  const navigate = useNavigate();
  const roles = getConfigByKey("POCS_ROLE");
  const status = getConfigByKey("STATUS_CONSTANTS");

  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({
    leadId: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "ACTIVE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addPoc = async () => {
    try {
      const res = await addPocApiHelper(formData);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // added, redirect to list page
      navigate("/poc");
    } catch (error) {
      console.log("AddPocComponent - addPoc", error);
    }
  };

  const getLeads = async () => {
    try {
      const res = await getLeadsApiHelper();

      if (!res || res?.status !== 200) throw "Something went wrong";

      setLeads(res?.data?.response);
    } catch (error) {
      console.log("DashboardComponent - getStats", error);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

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
          <div>Add POC</div>
        </div>

        {/* form */}
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="leadId" className="form-label">
              Leads
            </label>
            <select
              className="form-select mb-3"
              id="leadId"
              name="leadId"
              aria-label="Default select example"
              value={formData.leadId}
              onChange={handleChange}
            >
              <option>Select Lead</option>
              {leads?.length ? (
                leads.map((lead) => (
                  <option value={lead._id} key={lead._id}>
                    {lead?.name}
                  </option>
                ))
              ) : (
                <option value="1">No leads</option>
              )}
            </select>
          </div>
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
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
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
          onClick={addPoc}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default AddPocComponent;
