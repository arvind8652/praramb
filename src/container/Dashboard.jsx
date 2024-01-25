import React, { useState } from "react";
import CustListGroup from "../components/NotificationsList";
import CustTable from "../components/CustomersList";
import CustModal from "../components/commonComp/CustModal";
import CustomerForm from "../components/forms/CustomerForm";
import { CUSTOMER_FORM, NOTIFICATION_FORM } from "../utities/constants";
import NotificationForm from "../components/forms/NotificationForm";
import MemberShipSummary from "../components/MemberShipSummary";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalFor, setModalFor] = useState(CUSTOMER_FORM);
  return (
    <div className="container  p-3">
      <MemberShipSummary />
      <div className="row">
        <div className="col-8">
          <CustTable
            onClick={() => {
              setShowModal(true);
              setModalFor(CUSTOMER_FORM);
            }}
          />
        </div>
        <div className="col-4">
          <CustListGroup
            onClick={() => {
              setShowModal(true);
              setModalFor(NOTIFICATION_FORM);
            }}
          />
        </div>
      </div>
      <CustModal
        show={showModal}
        onHide={() => setShowModal(false)}
        children={
          modalFor === CUSTOMER_FORM ? <CustomerForm /> : <NotificationForm />
        }
        modalFor={modalFor}
        title={modalFor === CUSTOMER_FORM ? "Customer Form" : "Notification"}
      />
    </div>
  );
};

export default Dashboard;
