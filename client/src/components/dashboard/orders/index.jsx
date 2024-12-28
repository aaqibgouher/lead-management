import { useEffect, useState } from "react";
import { getLeadsApiHelper } from "../../../apiHelper/leads";
import { NavLink } from "react-router-dom";
import OrderListComponent from "./list";
import { getOrdersByLeadIdApiHelper } from "../../../apiHelper/orders";

const OrdersComponent = () => {
  const [leads, setLeads] = useState([]);
  const [leadId, setLeadId] = useState("");
  const [orders, setOrders] = useState([]);

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

  const getOrdersByLeadId = async () => {
    try {
      const res = await getOrdersByLeadIdApiHelper(leadId);

      if (!res || res?.status !== 200) throw "Something went wrong";

      setOrders(res?.data?.response);
    } catch (error) {
      console.log("PocComponent - getPocsByLeadId", error);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

  useEffect(() => {
    getOrdersByLeadId();
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
          <div>Orders</div>
          <NavLink to="/orders/add">
            <button
              className="btn"
              style={{ background: "#d73c46", color: "white" }}
            >
              Add Order
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
        <OrderListComponent orders={orders} />
      </div>
    </>
  );
};

export default OrdersComponent;
