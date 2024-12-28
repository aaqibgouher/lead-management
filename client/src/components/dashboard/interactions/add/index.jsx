import { useEffect, useState } from "react";
import { getConfigByKey } from "../../../../utils/common";
import { getLeadsApiHelper } from "../../../../apiHelper/leads";
import { useNavigate } from "react-router-dom";
import { getPocsByLeadIdApiHelper } from "../../../../apiHelper/poc";
import { addInteractionApiHelper } from "../../../../apiHelper/interactions";

const AddInteractionComponent = () => {
  const navigate = useNavigate();
  const interactionTypes = getConfigByKey("INTERACTION_TYPE_CONSTANTS");
  const status = getConfigByKey("STATUS_CONSTANTS");

  const [leads, setLeads] = useState([]);
  const [pocs, setPocs] = useState([]);
  const [formData, setFormData] = useState({
    leadId: "",
    pocId: "",
    type: "",
    description: "",
    date: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "leadId") {
      await getPocsByLeadId(value);
    }
  };

  const addInteraction = async () => {
    try {
      const res = await addInteractionApiHelper(formData);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // added, redirect to list page
      navigate("/interactions");
    } catch (error) {
      console.log("AddInteractionComponent - addPoc", error);
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

  const getPocsByLeadId = async (leadId) => {
    try {
      const res = await getPocsByLeadIdApiHelper(leadId);

      if (!res || res?.status !== 200) throw "Something went wrong";

      setPocs(res?.data?.response);
    } catch (error) {
      console.log("PocComponent - getPocsByLeadId", error);
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
          <div>Add Interaction</div>
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
            <label htmlFor="pocId" className="form-label">
              Pocs
            </label>
            <select
              className="form-select mb-3"
              id="pocId"
              name="pocId"
              aria-label="Default select example"
              value={formData.pocId}
              onChange={handleChange}
            >
              <option>Select poc</option>
              {pocs?.length ? (
                pocs.map((lead) => (
                  <option value={lead._id} key={lead._id}>
                    {lead?.name}
                  </option>
                ))
              ) : (
                <option value="1">No pocs</option>
              )}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select
              className="form-select"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              {Object.values(interactionTypes)?.length ? (
                Object.values(interactionTypes).map((interactionType) => (
                  <option
                    value={interactionType.value}
                    key={interactionType.value}
                  >
                    {interactionType.label}
                  </option>
                ))
              ) : (
                <option value="">No types</option>
              )}
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="description" className="form-label">
              Description
            </label>

            <textarea
              className="form-control"
              id="description"
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <button
          type="button"
          className="btn"
          style={{ background: "#d73c46", color: "white" }}
          onClick={addInteraction}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default AddInteractionComponent;
