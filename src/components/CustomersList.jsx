import {
  faPencil,
  faPerson,
  faPersonDress,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Example from "./commonComp/CustOverlay";
import { get } from "../utities/apiServices";

const CustomersList = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getCustomersList = async () => {
      const val = await get("customersList");
      setData(val?.data);
    };
    getCustomersList();
  }, []);
  return (
    <div className="card  shadow p-3 mb-5 bg-white rounded">
      <div className="card-header d-flex justify-content-between">
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
              <th scope="col">Status</th>
              <th scope="col">End Date</th>
              <th scope="col">Gender</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((val) => {
              return (
                <tr key={val.id}>
                  <th scope="row">{val.id}</th>
                  <td>{`${val.firstName} ${val.lastName}`}</td>
                  <td>{val.status}</td>
                  <td>{val.endDate}</td>
                  <td>
                    {val.gender === "male" ? (
                      <FontAwesomeIcon
                        icon={faPerson}
                        size="2x"
                        style={{ color: "#74C0FC" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faPersonDress}
                        style={{ color: "#cc28c7" }}
                        size="2x"
                      />
                    )}
                  </td>
                  <td>
                    <Example />
                  </td>
                </tr>
              );
            })}
            {/* <tr>
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
            </tr> */}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CustomersList;
