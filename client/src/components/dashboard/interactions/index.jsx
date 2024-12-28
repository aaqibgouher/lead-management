import { NavLink } from "react-router-dom";
import InteractionListComponent from "./list";
import { useEffect, useState } from "react";
import { getLeadsApiHelper } from "../../../apiHelper/leads";
import { getInteractionsByLeadIdApiHelper } from "../../../apiHelper/interactions";

const InteractionsComponent = () => {
  const [interactions, setInteractions] = useState([]);

  const [leads, setLeads] = useState([]);
  const [leadId, setLeadId] = useState("");

  const getLeads = async () => {
    try {
      const res = await getLeadsApiHelper();

      if (!res || res?.status !== 200) throw "Something went wrong";

      const data = res?.data?.response;
      setLeads(data);
    } catch (error) {
      console.log("DashboardComponent - getStats", error);
    }
  };

  const getInteractionsByLeadId = async () => {
    try {
      const res = await getInteractionsByLeadIdApiHelper(leadId);

      if (!res || res?.status !== 200) throw "Something went wrong";

      setInteractions(res?.data?.response);
    } catch (error) {
      console.log("PocComponent - getPocsByLeadId", error);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

  useEffect(() => {
    getInteractionsByLeadId();
  }, [leadId]);

  return (
    <>
      <div className="container my-2">
        <div
          className="mb-3"
          style={{
            display: "flex", // Use flexbox to align items in the same row
            justifyContent: "space-between", // Space between the text and button
            alignItems: "center", // Vertically align items (text and button)
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          <div>Interactions</div>
          <NavLink to="/interactions/add">
            <button
              className="btn"
              style={{ background: "#d73c46", color: "white" }}
            >
              Add Interaction
            </button>
          </NavLink>
          {/* Example button */}
        </div>

        {/* select */}
        {/* select */}
        <div className="row">
          <div className="col d-flex justify-content-end">
            <select
              className="form-select mb-3"
              aria-label="Default select example"
              style={{ width: "200px" }}
              value={leadId}
              onChange={(e) => setLeadId(e.target.value)}
            >
              <option value="">Select Lead</option>
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
        </div>

        {/* List */}
        <InteractionListComponent
          interactions={interactions}
          getInteractionsByLeadId={getInteractionsByLeadId}
        />
      </div>
    </>
  );
};

export default InteractionsComponent;
