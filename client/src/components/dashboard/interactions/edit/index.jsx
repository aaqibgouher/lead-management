import { useEffect, useState } from "react";
import { formatDate, getConfigByKey } from "../../../../utils/common";
import { getLeadsApiHelper } from "../../../../apiHelper/leads";
import { useNavigate, useParams } from "react-router-dom";
import { getPocsByLeadIdApiHelper } from "../../../../apiHelper/poc";
import {
  addInteractionApiHelper,
  editInteractionByIdApiHelper,
  getInteractionByIdApiHelper,
} from "../../../../apiHelper/interactions";

const EditInteractionComponent = () => {
  const navigate = useNavigate();
  const interactionTypes = getConfigByKey("INTERACTION_TYPE_CONSTANTS");
  const status = getConfigByKey("STATUS_CONSTANTS");
  const { interactionId } = useParams();

  const [leads, setLeads] = useState([]);
  const [pocs, setPocs] = useState([]);
  const [formData, setFormData] = useState({
    leadId: "",
    pocId: "",
    type: "",
    description: "",
    date: "",
    status: "ACTIVE",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "leadId") {
      // await getPocsByLeadId(value);
    }
  };

  const editInteraction = async () => {
    try {
      const payload = {
        type: formData?.type,
        description: formData?.description,
        date: formData?.date,
        status: formData?.status,
      };
      const res = await editInteractionByIdApiHelper(interactionId, payload);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // added, redirect to list page
      navigate("/interactions");
    } catch (error) {
      console.log("EditInteractionComponent - addPoc", error);
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

  const getInteractionById = async () => {
    try {
      const res = await getInteractionByIdApiHelper(interactionId);

      if (!res || res?.status !== 200) throw "Something went wrong";

      const data = res?.data?.response;

      // prefill
      setFormData({
        leadId: data?.lead?._id || "",
        pocId: data?.poc?._id || "",
        type: data?.type || "",
        description: data?.description || "",
        date: formatDate(data?.date) || "",
        status: data?.status || "",
      });
    } catch (error) {
      console.log("ViewInteractionComponent - getInteractionById", error);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

  useEffect(() => {
    if (interactionId) {
      getInteractionById();
    }
  }, [interactionId]);

  useEffect(() => {
    if (formData.leadId) {
      getPocsByLeadId(formData.leadId);
    }
  }, [formData.leadId]);

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
              disabled
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
              disabled
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
              {Object.keys(status).map((sta, staIdx) => (
                <option key={staIdx} value={sta}>
                  {sta}
                </option>
              ))}
            </select>
          </div>
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
          onClick={editInteraction}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default EditInteractionComponent;
