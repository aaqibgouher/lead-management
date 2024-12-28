import { NavLink } from "react-router-dom";
import { formatDate } from "../../../../../utils/common";
import { deleteInteractionByIdApiHelper } from "../../../../../apiHelper/interactions";

const InteractionListItemComponent = ({
  interaction,
  index,
  getInteractionsByLeadId,
}) => {
  const deleteInteraction = async (interactionId) => {
    try {
      const res = await deleteInteractionByIdApiHelper(interactionId);

      if (!res || res?.status !== 200) throw "Something went wrong";

      await getInteractionsByLeadId();
    } catch (error) {
      console.log("InteractionListItemComponent - deleteInteraction", error);
    }
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{interaction.lead.name}</td>
      <td>{interaction.type}</td>
      <td>{interaction.description}</td>
      <td>{formatDate(interaction.date)}</td>
      <td>{interaction.status}</td>
      <td>{formatDate(interaction.createdAt)}</td>
      <td>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <NavLink to={`/interactions/view/${interaction._id}`}>
            <button type="button" className="btn">
              <i className="bi bi-eye-fill" style={{ color: "#d73c46" }}></i>
            </button>
          </NavLink>
          <NavLink to={`/interactions/edit/${interaction._id}`}>
            <button type="button" className="btn">
              <i className="bi bi-pencil-fill" style={{ color: "#d73c46" }}></i>
            </button>
          </NavLink>
          <button
            type="button"
            className="btn"
            onClick={() => deleteInteraction(interaction._id)}
          >
            <i className="bi bi-trash-fill" style={{ color: "#d73c46" }}></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InteractionListItemComponent;
