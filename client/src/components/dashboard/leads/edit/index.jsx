import { useEffect, useState } from "react";
import { getConfigByKey } from "../../../../utils/common";
import {
  addLeadApiHelper,
  editLeadApiHelper,
  getLeadByIdApiHelper,
} from "../../../../apiHelper/leads";
import { useNavigate, useParams } from "react-router-dom";

const EditLeadComponent = () => {
  const navigate = useNavigate();
  const { leadId } = useParams();
  const timezone = getConfigByKey("TIMEZONE_CONSTANTS");
  const frequencyType = getConfigByKey("INTERACTION_CALL_FREQUENCY_TYPE");
  const weeklyDay = getConfigByKey("INTERACTION_WEEKLY_DAY");
  const statusArr = getConfigByKey("LEADS_STATUS_CONSTATNS");

  const [formData, setFormData] = useState({
    name: "",
    ownedBy: "",
    description: "",
    address: "",
    timezone: "UTC",
    frequencyType: "DAILY",
    weeklyDayOfWeek: [],
    monthlyDateOfMonth: [],
    yearlyDateOfYear: [],
    status: "ACTIVE",
  });

  const [yearlyMonth, setYearlyMonth] = useState("");
  const [yearlyDay, setYearlyDay] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // if frequency type, set weekly, monthly, yearly to []
    if (name === "frequencyType") {
      setFormData((prevState) => ({
        ...prevState,
        weeklyDayOfWeek: [],
        monthlyDateOfMonth: [],
        yearlyDateOfYear: [],
      }));
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addYearlyDate = () => {
    if (yearlyMonth && yearlyDay) {
      const newDate = `${yearlyMonth}-${yearlyDay}`;
      setFormData((prevState) => ({
        ...prevState,
        yearlyDateOfYear: [...prevState.yearlyDateOfYear, newDate],
      }));
      setYearlyMonth("");
      setYearlyDay("");
    }
  };

  const removeYearlyDate = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      yearlyDateOfYear: prevState.yearlyDateOfYear.filter((d) => d !== date),
    }));
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    let values = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    // Cast to number if it's the monthlyDateOfMonth field and frequencyType is MONTHLY
    if (name === "monthlyDateOfMonth" && formData.frequencyType === "MONTHLY") {
      values = values.map(Number); // Convert to an array of numbers
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: values,
    }));
  };

  const editLead = async () => {
    try {
      console.log(formData, "form 88888");
      const res = await editLeadApiHelper(leadId, formData);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // added, redirect to list page
      navigate("/leads");
    } catch (error) {
      console.log("EditLeadComponent - addLead", error);
    }
  };

  const getLeadById = async () => {
    try {
      const res = await getLeadByIdApiHelper({ leadId });

      if (!res || res?.status !== 200) throw "Something went wrong";

      const leadData = res?.data?.response;

      // prefill
      setFormData({
        name: leadData?.name || "",
        ownedBy: leadData?.owned_by || "",
        description: leadData?.description || "",
        address: leadData?.address || "",
        timezone: leadData?.timezone || "UTC",
        frequencyType: leadData?.frequency_type || "DAILY",
        weeklyDayOfWeek: leadData?.weekly_day_of_week || [],
        monthlyDateOfMonth: leadData?.monthly_date_of_month || [],
        yearlyDateOfYear: leadData?.yearly_date_of_year || [],
        status: leadData?.status || "ACTIVE",
      });
    } catch (error) {
      console.log("DashboardComponent - getStats", error);
    }
  };

  useEffect(() => {
    if (leadId) {
      getLeadById();
    }
  }, [leadId]);

  return (
    <>
      <div className="container my-2">
        <div
          className="mb-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          <div>Edit Lead</div>
        </div>

        {/* form */}
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <label htmlFor="ownedBy" className="form-label">
              Owned By
            </label>
            <input
              type="text"
              className="form-control"
              id="ownedBy"
              name="ownedBy"
              value={formData.ownedBy}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="col-6">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-4">
            <label htmlFor="timezone" className="form-label">
              Timezone
            </label>
            <select
              className="form-select"
              id="timezone"
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
            >
              {Object.entries(timezone).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="frequencyType" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {Object.keys(statusArr).map((sta, staIdx) => (
                <option key={staIdx} value={sta}>
                  {sta}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="frequencyType" className="form-label">
              Frequency Type
            </label>
            <select
              className="form-select"
              id="frequencyType"
              name="frequencyType"
              value={formData.frequencyType}
              onChange={handleChange}
            >
              {Object.entries(frequencyType).map(([key, { label, value }]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {formData.frequencyType === "WEEKLY" && (
          <div className="mb-3">
            <label htmlFor="weeklyDayOfWeek" className="form-label">
              Weekly Day of the Week
            </label>
            <select
              className="form-select"
              id="weeklyDayOfWeek"
              name="weeklyDayOfWeek"
              multiple
              value={formData.weeklyDayOfWeek}
              onChange={handleMultiSelectChange}
            >
              {Object.values(weeklyDay).map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}

        {formData.frequencyType === "MONTHLY" && (
          <div className="mb-3">
            <label htmlFor="monthlyDateOfMonth" className="form-label">
              Monthly Date of the Month
            </label>
            <select
              className="form-select"
              id="monthlyDateOfMonth"
              name="monthlyDateOfMonth"
              multiple
              value={formData.monthlyDateOfMonth}
              onChange={handleMultiSelectChange}
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={+(i + 1)}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        {formData.frequencyType === "YEARLY" && (
          <div className="mb-3">
            <label className="form-label">Yearly Date</label>
            <div className="row">
              <div className="col-4">
                <select
                  className="form-select"
                  value={yearlyMonth}
                  onChange={(e) => setYearlyMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {new Date(0, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <select
                  className="form-select"
                  value={yearlyDay}
                  onChange={(e) => setYearlyDay(e.target.value)}
                >
                  <option value="">Select Day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <button
                  className="btn"
                  type="button"
                  onClick={addYearlyDate}
                  style={{ background: "#d73c46", color: "white" }}
                >
                  Add Date
                </button>
              </div>
            </div>

            <ul
              className="mt-3 d-flex flex-wrap"
              style={{ gap: "8px", padding: 0, listStyleType: "none" }}
            >
              {formData.yearlyDateOfYear.map((date, index) => (
                <li key={index}>
                  <span
                    className="chip d-flex align-items-center px-3 py-1"
                    style={{
                      background: "#e0e0e0",
                      borderRadius: "16px",
                      display: "inline-flex",
                    }}
                  >
                    {date}
                    <button
                      type="button"
                      className="btn btn-sm btn-close ms-2"
                      aria-label="Remove"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        outline: "none",
                        color: "#d73c46",
                      }}
                      onClick={() => removeYearlyDate(date)}
                    >
                      ✖
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          className="btn"
          style={{ background: "#d73c46", color: "white" }}
          onClick={editLead}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default EditLeadComponent;
