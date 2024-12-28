import { useEffect, useState } from "react";
import { formatDate } from "../../../../utils/common";
import { useParams } from "react-router-dom";
import { getInteractionByIdApiHelper } from "../../../../apiHelper/interactions";

const ViewInteractionComponent = () => {
  const [interaction, setInteraction] = useState(null);
  const { interactionId } = useParams();

  const getInteractionById = async () => {
    try {
      const res = await getInteractionByIdApiHelper(interactionId);

      if (!res || res?.status !== 200) throw "Something went wrong";

      setInteraction(res?.data?.response);
    } catch (error) {
      console.log("ViewInteractionComponent - getInteractionById", error);
    }
  };

  useEffect(() => {
    if (interactionId) {
      getInteractionById();
    }
  }, [interactionId]);

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
          <div>View Interaction</div>
        </div>

        {/* POC Info */}
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
                Type:
                {interaction?.type}
              </p>
              <p>
                Status:
                {interaction?.status}
              </p>
            </div>
            <div className="col text-start">
              <p>Description: {interaction?.description}</p>
              <p>Created At: {formatDate(interaction?.createdAt)}</p>
            </div>
            <div className="col text-start">
              <p>Date: {formatDate(interaction?.date)}</p>
            </div>
          </div>
        </div>

        <hr />

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
                {interaction?.lead?.name}
              </p>
            </div>
            <div className="col text-start"></div>
            <div className="col text-start"></div>
          </div>
        </div>

        <hr />

        {/* Lead Info */}
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "grey",
          }}
        >
          Poc Info
        </p>
        <div className="container text-center">
          <div className="row">
            <div className="col text-start">
              <p>
                Name:
                {interaction?.poc?.name}
              </p>
            </div>
            <div className="col text-start">
              <p>
                Role:
                {interaction?.poc?.role}
              </p>
            </div>
            <div className="col text-start"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewInteractionComponent;
