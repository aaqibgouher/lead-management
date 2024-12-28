import { useEffect, useState } from "react";
import { formatDate } from "../../../../utils/common";
import { getPocByIdApiHelper } from "../../../../apiHelper/poc";
import { useParams } from "react-router-dom";

const ViewPocComponent = () => {
  const [poc, setPoc] = useState(null);

  const { pocId } = useParams();

  const getPocById = async () => {
    try {
      const res = await getPocByIdApiHelper(pocId);

      if (!res || res?.status !== 200) throw "Something went wrong";

      setPoc(res?.data?.response);
    } catch (error) {
      console.log("DashboardComponent - getStats", error);
    }
  };

  useEffect(() => {
    if (pocId) {
      getPocById();
    }
  }, [pocId]);

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
          <div>View Poc</div>
        </div>

        {/* POC Info */}
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "grey",
          }}
        >
          POC Info
        </p>
        <div className="container text-center">
          <div className="row">
            <div className="col text-start">
              <p>
                Name:
                {poc?.name}
              </p>
              <p>
                Phone:
                {poc?.phone}
              </p>
            </div>
            <div className="col text-start">
              <p>Role: {poc?.role}</p>
              <p>
                Status:
                {poc?.status}
              </p>
            </div>
            <div className="col text-start">
              <p>Email: {poc?.email}</p>
              <p>Created At: {formatDate(poc?.createdAt)}</p>
            </div>
          </div>
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
                {poc?.lead?.name}
              </p>
            </div>
            <div className="col text-start"></div>
            <div className="col text-start"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPocComponent;
