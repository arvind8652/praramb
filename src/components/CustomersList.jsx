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
import {
  CUSTOMER_DELETE,
  CUSTOMER_EDIT,
  CUSTOMER_VIEW,
  atomNameConst,
} from "../utities/constants";
import useSelector from "../store/selector";
import CustOverLay from "./commonComp/CustOverlay";

const CustomersList = (props) => {
  const { setModalFor, setShowModal } = props;
  const { getRecoilVal, setRecoilVal } = useSelector();
  useEffect(() => {
    const getCustomersList = async () => {
      const val = await get("customers");
      setRecoilVal(atomNameConst.CUSTOMERS, val?.data);
    };
    getCustomersList();
  }, []);

  const handleClick = (clickEvent, data) => {
    switch (clickEvent) {
      case "view":
        {
          setModalFor(CUSTOMER_VIEW);
          setShowModal(true);
          setRecoilVal(atomNameConst.CUSTOMERSINGLEDATA, data);
        }
        break;
      case "edit":
        {
          setModalFor(CUSTOMER_EDIT);
          setShowModal(true);
          setRecoilVal(atomNameConst.CUSTOMERSINGLEDATA, data);
        }
        break;
      case "delete":
        {
          setModalFor(CUSTOMER_DELETE);
          setShowModal(true);
          setRecoilVal(atomNameConst.CUSTOMERSINGLEDATA, data);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="card  shadow p-3 mb-5 bg-white rounded">
      <div className="card-header d-flex justify-content-between">
        <h4 className="my-auto">Customers</h4>
        <button className="btn btn-primary btn-sm" onClick={props.onClick}>
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
            {getRecoilVal(atomNameConst.CUSTOMERS)?.map((val) => {
              return (
                <tr key={val.id}>
                  <th scope="row">{val.id}</th>
                  <td>{`${val.firstName} ${val.lastName}`}</td>
                  <td>{val.status}</td>
                  <td>{val.endDate}</td>
                  <td>
                    {val.gender === "male" ? (
                      <>
                        <FontAwesomeIcon
                          icon={faPerson}
                          size="2x"
                          style={{ color: "#74C0FC" }}
                        />
                        {" Male"}
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faPersonDress}
                          style={{ color: "#cc28c7" }}
                          size="2x"
                        />
                        {" Female"}
                      </>
                    )}
                  </td>
                  <td>
                    <CustOverLay handleClick={handleClick} data={val} />
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
