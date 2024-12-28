import { NavLink } from "react-router-dom";
import LeadsListComponent from "./list";
import { useEffect, useState } from "react";
import { getLeadsApiHelper } from "../../../apiHelper/leads";

const LeadComponent = () => {
  const [data, setData] = useState([]);

  const getLeads = async () => {
    try {
      const res = await getLeadsApiHelper();

      if (!res || res?.status !== 200) throw "Something went wrong";

      setData(res?.data?.response);
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
            display: "flex", // Use flexbox to align items in the same row
            justifyContent: "space-between", // Space between the text and button
            alignItems: "center", // Vertically align items (text and button)
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          <div>Leads</div>
          <NavLink to="/leads/add">
            <button
              className="btn"
              style={{ background: "#d73c46", color: "white" }}
            >
              Add Lead
            </button>
          </NavLink>

          {/* Example button */}
        </div>

        {/* List */}
        <LeadsListComponent leads={data} getLeads={getLeads} />
      </div>
    </>
  );
};

export default LeadComponent;
