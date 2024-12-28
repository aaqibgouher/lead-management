import { useEffect, useState } from "react";
import BarChart from "../general/chart";
import {
  getStatsApiHelper,
  getTodaysLeadsApiHelper,
  getTopPerformingLeadsApiHelper,
} from "../../apiHelper/leads";
import { useNavigate } from "react-router-dom";

const DashboardComponent = () => {
  const [stats, setStats] = useState(null);
  const [todayCalls, setTodayCalls] = useState([]);
  const [topLeads, setTopLeads] = useState([]);
  const navigate = useNavigate();

  const getStats = async () => {
    try {
      const res = await getStatsApiHelper();

      if (!res || res?.status !== 200) throw "Something went wrong";

      setStats(res?.data?.response);
      console.log(res?.data?.response);
    } catch (error) {
      console.log("DashboardComponent - getStats", error);
    }
  };

  const getTodaysLeads = async () => {
    try {
      const res = await getTodaysLeadsApiHelper();

      if (!res || res?.status !== 200) throw "Something went wrong";

      setTodayCalls(res?.data?.response);
    } catch (error) {
      console.log("DashboardComponent - getStats", error);
    }
  };

  const getTopPerformingLeads = async () => {
    try {
      const res = await getTopPerformingLeadsApiHelper();

      if (!res || res?.status !== 200) throw "Something went wrong";

      setTopLeads(res?.data?.response);
    } catch (error) {
      console.log("DashboardComponent - getStats", error);
    }
  };

  useEffect(() => {
    getStats();
    getTodaysLeads();
    getTopPerformingLeads();
  }, []);

  return (
    <>
      <div className="container my-2">
        {/* First Row: 3 columns */}
        <div className="row mb-4">
          <div className="col-4">
            <div
              className="card"
              style={{
                backgroundColor: "#fbd4d0",
                border: "none",
              }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <span
                  className="text-left"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Total Leads
                </span>
                <span
                  className="fs-3"
                  style={{
                    fontWeight: "bold",
                    color: "#d73c46",
                  }}
                >
                  {stats?.leadCount}
                </span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div
              className="card"
              style={{
                backgroundColor: "#fbd4d0",
                border: "none",
              }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <span
                  className="text-left"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Total POC's
                </span>
                <span
                  className="fs-3"
                  style={{
                    fontWeight: "bold",
                    color: "#d73c46",
                  }}
                >
                  {stats?.pocCount}
                </span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div
              className="card"
              style={{
                backgroundColor: "#fbd4d0",
                border: "none",
              }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <span
                  className="text-left"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Total Interactions
                </span>
                <span
                  className="fs-3"
                  style={{
                    fontWeight: "bold",
                    color: "#d73c46",
                  }}
                >
                  {stats?.interactionCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: 2 columns */}
        <div className="row">
          {/* First column: List of calls today */}
          <div className="col-6">
            <div className="">
              <div
                className="text-center mb-3"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Today's Calls
              </div>
              <div className="card-body p-0">
                <ul className="list-group">
                  {todayCalls?.length ? (
                    todayCalls.map((call, index) => (
                      <li
                        key={index}
                        className="list-group-item my-2"
                        style={{
                          backgroundColor: "#fbd4d0",
                          border: "none",
                          borderRadius: "8px",
                          padding: "15px",
                        }}
                      >
                        {/* Main content: Name and Type */}
                        <div className="d-flex justify-content-between align-items-center">
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            {call.name} - {call.frequency_type}
                          </span>
                          <div className="d-inline-flex gap-2">
                            {/* View details button */}
                            <button
                              className="btn btn-sm"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapseExample${index}`}
                              aria-expanded="false"
                              aria-controls={`collapseExample${index}`}
                            >
                              <i
                                className="bi bi-eye-fill"
                                style={{ color: "#d73c46", fontSize: "20px" }}
                              ></i>
                            </button>
                            {/* Call button */}
                            <button
                              className="btn btn-sm"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1rem",
                              }}
                              onClick={() => navigate("/interactions/add")}
                            >
                              <i
                                className="bi bi-telephone-fill"
                                style={{ color: "#d73c46", fontSize: "20px" }}
                              ></i>
                            </button>
                          </div>
                        </div>

                        {/* Collapsible section */}
                        <div
                          className="collapse mt-2"
                          id={`collapseExample${index}`}
                        >
                          <div className="card card-body">
                            <p>
                              <strong>Owned By:</strong>{" "}
                              {call.owned_by || "N/A"}
                            </p>
                            <p>
                              <strong>Email:</strong> {call.user.email || "N/A"}
                            </p>
                            <p>
                              <strong>Phone:</strong> {call.user.phone || "N/A"}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <>
                      <p className="text-center">No calls today</p>{" "}
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Second column: Bar graph (can integrate Chart.js or similar) */}
          <div className="col-6">
            <div
              className="text-center mb-3"
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Top Performing Leads
            </div>

            {/* Chart */}
            <BarChart topLeads={topLeads} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
