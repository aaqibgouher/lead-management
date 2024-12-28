import React from "react";
import "./style.css"; // Ensure that the correct path is used
import InteractionListItemComponent from "./listItem";
import OrderListItemComponent from "./listItem";

const OrderListComponent = ({ orders }) => {
  return (
    <>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Lead's Name</th>
            <th scope="col">Order Id</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Discount</th>
            <th scope="col">Net Price</th>
            <th scope="col">Status</th>
            <th scope="col">Created On</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length ? (
            orders.map((order, index) => (
              <OrderListItemComponent order={order} index={index} key={index} />
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">
                No orders
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default OrderListComponent;
