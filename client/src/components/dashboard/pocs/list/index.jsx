import React from "react";
import "./style.css"; // Ensure that the correct path is used
import PocListItemComponent from "./listItem";

const PocListComponent = ({ pocs, getPocsByLeadId }) => {
  return (
    <>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Lead's Name</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Status</th>
            <th scope="col">Created On</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {pocs?.length ? (
            pocs.map((poc, index) => (
              <PocListItemComponent
                poc={poc}
                index={index}
                key={index}
                getPocsByLeadId={getPocsByLeadId}
              />
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No pocs
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default PocListComponent;
