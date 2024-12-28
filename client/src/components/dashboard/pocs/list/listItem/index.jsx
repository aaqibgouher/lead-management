import { NavLink } from "react-router-dom";
import { formatDate } from "../../../../../utils/common";
import { deletePocApiHelper } from "../../../../../apiHelper/poc";

const PocListItemComponent = ({ poc, index, getPocsByLeadId }) => {
  const deletePoc = async (pocId) => {
    try {
      const res = await deletePocApiHelper(pocId);

      if (!res || res?.status !== 200) throw "Something went wrong";

      await getPocsByLeadId();
    } catch (error) {
      console.log("PocListItemComponent - deletePoc", error);
    }
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{poc.lead.name}</td>
      <td>{poc.name}</td>
      <td>{poc.role}</td>
      <td>{poc.email}</td>
      <td>{poc.phone}</td>
      <td>{poc.status}</td>
      <td>{formatDate(poc.createdAt)}</td>
      <td>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <NavLink to={`/poc/view/${poc._id}`}>
            <button type="button" className="btn">
              <i className="bi bi-eye-fill" style={{ color: "#d73c46" }}></i>
            </button>
          </NavLink>
          <NavLink to={`/poc/edit/${poc._id}`}>
            <button type="button" className="btn">
              <i className="bi bi-pencil-fill" style={{ color: "#d73c46" }}></i>
            </button>
          </NavLink>
          <button
            type="button"
            className="btn"
            onClick={() => deletePoc(poc._id)}
          >
            <i className="bi bi-trash-fill" style={{ color: "#d73c46" }}></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PocListItemComponent;
