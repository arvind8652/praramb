import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustCard = (props) => {
  const { icon, data, text } = props;
  return (
    <div className="card text-center shadow p-3 mb-5 bg-white rounded">
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-around">
          <FontAwesomeIcon icon={icon} size="3x" />
          <div className="card fs-1 shadow p-2 bg-white rounded">{data}</div>
        </h5>
        <h5 className="card-text">{text}</h5>
      </div>
    </div>
  );
};

export default CustCard;
