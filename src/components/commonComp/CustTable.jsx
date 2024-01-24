import {
  faEllipsisVertical,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table } from "react-bootstrap";
import Example from "./CustOverlay";

const CustTable = (props) => {
  return (
    <div className="card  shadow p-3 mb-5 bg-white rounded">
      <div
        className="card-header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h4 className="my-auto">Customers</h4>
        <button className="btn btn-primary btn-sm" {...props}>
          Add
        </button>
      </div>
      <div className="card-body">
        <Table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Last Date</th>
              <th scope="col">
                <Example />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <button className="btn btn-info">Action</button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>
                <FontAwesomeIcon icon={faPencil} size="lg" {...props} />
                <div className="vr mx-2"></div>
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colSpan="2">Larry the Bird</td>
              <td>
                <Example />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CustTable;
