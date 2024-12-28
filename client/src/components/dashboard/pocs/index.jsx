import { NavLink } from "react-router-dom";
import PocListComponent from "./list";
import { useEffect, useState } from "react";
import { getLeadsApiHelper } from "../../../apiHelper/leads";
import { getPocsByLeadIdApiHelper } from "../../../apiHelper/poc";

const PocComponent = () => {
  const [data, setData] = useState([]);
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

  const getPocsByLeadId = async () => {
    try {
      const res = await getPocsByLeadIdApiHelper(leadId);

      if (!res || res?.status !== 200) throw "Something went wrong";

      setData(res?.data?.response);
    } catch (error) {
      console.log("PocComponent - getPocsByLeadId", error);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

  useEffect(() => {
    getPocsByLeadId();
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
          <div>Point Of Contact</div>
          <NavLink to="/poc/add">
            <button
              className="btn"
              style={{ background: "#d73c46", color: "white" }}
            >
              Add POC
            </button>
          </NavLink>
          {/* Example button */}
        </div>

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
        <PocListComponent pocs={data} getPocsByLeadId={getPocsByLeadId} />
      </div>
    </>
  );
};

export default PocComponent;
