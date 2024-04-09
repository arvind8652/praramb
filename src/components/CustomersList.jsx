import { faPerson, faPersonDress } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Pagination, Table } from "react-bootstrap";
import { get } from "../utilities/apiServices";
import {
  CUSTOMER_DELETE,
  CUSTOMER_EDIT,
  CUSTOMER_VIEW,
  PAYMENT_FORM,
  atomNameConst,
} from "../utilities/constants";
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

  const handlePayClick = (data) => {
    setModalFor(PAYMENT_FORM);
    setShowModal(true);
    setRecoilVal(atomNameConst.CUSTOMERSINGLEDATA, data);
  };

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

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

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
              <th scope="col">Amount Pending</th>
              <th scope="col">Gender</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {getRecoilVal(atomNameConst.CUSTOMERS)?.map((val, index) => {
              return (
                <tr key={val._id}>
                  <td>{index + 1}</td>
                  <td>{`${val.firstName} ${val.lastName}`}</td>
                  <td>{val.status}</td>
                  <td>{val.endDate}</td>
                  <td>
                    {
                      <div className="d-flex">
                        <button
                          className="btn btn-outline-primary btn-sm mx-2 py-0 rounded-4"
                          onClick={() => handlePayClick(val)}
                        >
                          {val.totalAmountDue === 0 ? "View Detail" : "Pay Now"}
                        </button>
                        {val.totalAmountDue}
                      </div>
                    }
                  </td>
                  <td>
                    {val.gender === "male" ? (
                      <>
                        <FontAwesomeIcon
                          icon={faPerson}
                          size="1x"
                          style={{ color: "#74C0FC" }}
                        />
                        {" Male"}
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faPersonDress}
                          style={{ color: "#cc28c7" }}
                          size="1x"
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
            <tr>
              <td colSpan={7} className="bg-light">
                <Pagination>{items}</Pagination>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CustomersList;
