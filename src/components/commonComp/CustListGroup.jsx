import React from "react";
import CustOverLay from "./CustOverlay";

const CustListGroup = (props) => {
  return (
    <div className="card  shadow p-3 mb-5 bg-white rounded">
      <div
        className="card-header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h4 className="my-auto">Notification</h4>
        <button className="btn btn-primary btn-sm" {...props}>
          Add
        </button>
      </div>
      <ul className="list-group list-group-flush">
        <li
          className="list-group-item list-group-item-action d-flex justify-content-between
 "
        >
          Cras justo odio
          <CustOverLay />
        </li>
        <li className="list-group-item list-group-item-action">
          Dapibus ac facilisis in
        </li>
        <li className="list-group-item list-group-item-action">
          Vestibulum at eros
        </li>
      </ul>
    </div>
  );
};

export default CustListGroup;
