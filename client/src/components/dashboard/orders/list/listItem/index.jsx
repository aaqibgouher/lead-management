import { NavLink } from "react-router-dom";
import { formatDate } from "../../../../../utils/common";
import { deleteInteractionByIdApiHelper } from "../../../../../apiHelper/interactions";

const OrderListItemComponent = ({ order, index }) => {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{order?.lead?.name}</td>
      <td>{order?.order_id}</td>
      <td>{order?.categories}</td>
      <td>{order?.price}</td>
      <td>{order?.discount}</td>
      <td>{order?.net_price}</td>
      <td>{order.status}</td>
      <td>{formatDate(order.createdAt)}</td>
    </tr>
  );
};

export default OrderListItemComponent;
