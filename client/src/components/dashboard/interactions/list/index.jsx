import React from "react";
import "./style.css"; // Ensure that the correct path is used
import InteractionListItemComponent from "./listItem";

const InteractionListComponent = ({
  interactions,
  getInteractionsByLeadId,
}) => {
  return (
    <>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Lead's Name</th>
            <th scope="col">Type</th>
            <th scope="col">Description</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Created On</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {interactions?.length ? (
            interactions.map((interaction, index) => (
              <InteractionListItemComponent
                interaction={interaction}
                index={index}
                key={index}
                getInteractionsByLeadId={getInteractionsByLeadId}
              />
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No interactions
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default InteractionListComponent;
