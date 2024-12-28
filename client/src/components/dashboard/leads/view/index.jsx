import { useEffect, useState } from "react";
import { formatDate } from "../../../../utils/common";
import { useParams } from "react-router-dom";
import { getLeadByIdApiHelper } from "../../../../apiHelper/leads";

const ViewLeadComponent = () => {
  const [lead, setLead] = useState(null);
  const { leadId } = useParams();

  const getLeadById = async () => {
    try {
      const res = await getLeadByIdApiHelper({ leadId });

      if (!res || res?.status !== 200) throw "Something went wrong";

      setLead(res?.data?.response);
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
      <div className="container my-4">
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
          <div>View Lead</div>
        </div>

        {/* Lead Info */}
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "grey",
          }}
        >
          Lead Info
        </p>
        <div className="container text-center">
          <div className="row">
            <div className="col text-start">
              <p>
                Name:
                {lead?.name}
              </p>
              <p>
                Address:
                {lead?.address}
              </p>
              <p>
                Created At:
                {formatDate(lead?.createdAt)}
              </p>
            </div>
            <div className="col text-start">
              <p>Owner's Name: {lead?.owned_by}</p>
              <p>
                Status:
                {lead?.status}
              </p>
              <p>
                Update At:
                {formatDate(lead?.updatedAt)}
              </p>
            </div>
            <div className="col text-start">
              <p>Description: {lead?.description}</p>
              <p>Timezone: {lead?.timezone}</p>
            </div>
          </div>
        </div>

        <hr />

        {/* Last Interaction */}
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "grey",
          }}
        >
          Interaction Info
        </p>
        <div className="container text-center">
          <div className="row">
            <div className="col text-start">
              <p>
                Frequency Type:
                {lead?.frequency_type}
              </p>
            </div>
            <div className="col text-start">
              <p>
                Value:
                {lead?.frequency_type === "DAILY" && "Daily"}
                {lead?.frequency_type === "WEEKLY" &&
                  lead?.weekly_day_of_week?.map((day, index) => (
                    <span key={index}>{day}, </span>
                  ))}
                {lead?.frequency_type === "MONTHLY" &&
                  lead?.monthly_date_of_month?.map((date, index) => (
                    <span key={index}>{date}, </span>
                  ))}
                {lead?.frequency_type === "YEARLY" &&
                  lead?.yearly_date_of_year?.map((date, index) => (
                    <span key={index}>{date}, </span>
                  ))}
              </p>
            </div>
          </div>
        </div>

        <hr />

        {/* Last Interaction */}
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "grey",
          }}
        >
          Last Interaction Info
        </p>
        <div className="container text-center">
          <div className="row">
            <div className="col text-start">
              <p>
                Type:
                {lead?.last_interaction?.type}
              </p>
            </div>
            <div className="col text-start">
              <p>Description: {lead?.last_interaction?.description}</p>
            </div>
            <div className="col text-start">
              <p>Date: {formatDate(lead?.last_interaction?.date)}</p>
            </div>
          </div>
        </div>

        <hr />

        {/* Lead Status History */}
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "grey",
          }}
        >
          Lead Status History
        </p>
        <div className="row mb-4">
          {lead?.history?.length &&
            lead?.history.map((history, index) => (
              <div className="col-4" key={index}>
                <div
                  className="card"
                  style={{
                    backgroundColor: "#fbd4d0",
                    border: "none",
                  }}
                >
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <span
                      className="text-left"
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      {history.status}
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#d73c46",
                      }}
                    >
                      {formatDate(history.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ViewLeadComponent;
