import { NavLink } from "react-router-dom";
import { formatDate } from "../../../../../utils/common";
import { deleteLeadApiHelper } from "../../../../../apiHelper/leads";

const LeadsListItemComponent = ({ lead, index, getLeads }) => {
  const deleteLead = async (leadId) => {
    try {
      const res = await deleteLeadApiHelper(leadId);

      if (!res || res?.status !== 200) throw "Something went wrong";

      await getLeads();
    } catch (error) {
      console.log("DashboardComponent - getStats", error);
    }
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{lead.name}</td>
      <td>{lead.owned_by}</td>
      <td>{lead.frequency_type}</td>
      <td>{lead.timezone}</td>
      <td>{lead.status}</td>
      <td>{formatDate(lead.createdAt)}</td>
      <td>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <NavLink to={`/leads/view/${lead._id}`}>
            <button type="button" className="btn">
              <i className="bi bi-eye-fill" style={{ color: "#d73c46" }}></i>
            </button>
          </NavLink>
          <NavLink to={`/leads/edit/${lead._id}`}>
            <button type="button" className="btn">
              <i className="bi bi-pencil-fill" style={{ color: "#d73c46" }}></i>
            </button>
          </NavLink>
          <button
            type="button"
            className="btn"
            onClick={() => deleteLead(lead._id)}
          >
            <i className="bi bi-trash-fill" style={{ color: "#d73c46" }}></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default LeadsListItemComponent;
