import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";

const CustCard = () => {
  return (
    <div className="card text-center shadow p-3 mb-5 bg-white rounded">
      <div className="card-body">
        <h5 className="card-title">
          <FontAwesomeIcon icon={faIndianRupee} size="3x" />
          300
        </h5>
        <p className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
      </div>
    </div>
  );
};

export default CustCard;
