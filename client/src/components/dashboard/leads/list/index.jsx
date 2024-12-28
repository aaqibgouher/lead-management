import React from "react";
import "./style.css"; // Ensure that the correct path is used
import LeadsListItemComponent from "./listItem";

const LeadsListComponent = ({ leads, getLeads }) => {
  return (
    <>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Lead's Name</th>
            <th scope="col">Owned By</th>
            <th scope="col">Freuency Type</th>
            <th scope="col">Timezone</th>
            <th scope="col">Status</th>
            <th scope="col">Created On</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {leads?.length ? (
            leads.map((lead, index) => (
              <LeadsListItemComponent
                lead={lead}
                index={index}
                key={index}
                getLeads={getLeads}
              />
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No leads
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default LeadsListComponent;
