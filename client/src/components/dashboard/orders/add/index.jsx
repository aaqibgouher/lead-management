import { useEffect, useState } from "react";
import { getConfigByKey } from "../../../../utils/common";
import { getLeadsApiHelper } from "../../../../apiHelper/leads";
import { addOrderByLeadIdApiHelper } from "../../../../apiHelper/orders";
import { useNavigate } from "react-router-dom";

const AddOrderComponent = () => {
  const navigate = useNavigate();
  const orderStatus = getConfigByKey("ORDER_STATUS_CONSTANTS");
  const [leads, setLeads] = useState([]);

  const [formData, setFormData] = useState({
    leadId: "",
    orderId: "",
    price: 0,
    discount: 0,
    netPrice: 0,
    status: "",
    categories: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" || name === "discount") {
      const updatedFormData = {
        ...formData,
        [name]: Number(value),
        netPrice:
          name === "discount"
            ? formData.price - Number(value)
            : Number(value) - formData.discount,
      };
      setFormData(updatedFormData);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addOrder = async () => {
    try {
      const payload = {
        leadId: formData?.leadId,
        orderId: formData?.orderId,
        price: formData?.price,
        discount: formData?.discount,
        netPrice: formData?.netPrice,
        status: formData?.status,
        categories: formData?.categories?.split(","),
      };
      const res = await addOrderByLeadIdApiHelper(payload);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // added, redirect to list page
      navigate("/orders");
    } catch (error) {
      console.log("AddOrderComponent - addOrder", error);
    }
  };

  const getLeads = async () => {
    try {
      const res = await getLeadsApiHelper();

      if (!res || res?.status !== 200) throw "Something went wrong";

      setLeads(res?.data?.response);
    } catch (error) {
      console.log("DashboardComponent - getStats", error);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

  return (
    <div className="container my-4">
      <h3>Add Order</h3>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="leadId" className="form-label">
            Lead
          </label>
          <select
            className="form-select mb-3"
            id="leadId"
            name="leadId"
            aria-label="Default select example"
            value={formData.leadId}
            onChange={handleChange}
          >
            <option>Select Lead</option>
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
        <div className="col-md-6">
          <label htmlFor="orderId" className="form-label">
            Order ID
          </label>
          <input
            type="text"
            id="orderId"
            name="orderId"
            className="form-control"
            value={formData.orderId}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="discount" className="form-label">
            Discount
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            className="form-control"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="netPrice" className="form-label">
            Net Price
          </label>
          <input
            type="number"
            id="netPrice"
            name="netPrice"
            className="form-control"
            value={formData.netPrice}
            disabled
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            {Object.values(orderStatus)?.length ? (
              Object.values(orderStatus)?.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))
            ) : (
              <option value="">No status</option>
            )}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="categories" className="form-label">
            Categories
          </label>
          <input
            type="text"
            id="categories"
            name="categories"
            className="form-control"
            placeholder="Enter categories, separated by commas"
            value={formData.categories}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="button" className="btn btn-primary" onClick={addOrder}>
        Submit
      </button>
    </div>
  );
};

export default AddOrderComponent;
