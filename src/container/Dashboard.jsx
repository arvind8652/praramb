import React, { useState } from "react";
import NotificationsList from "../components/NotificationsList";
import CustomersList from "../components/CustomersList";
import CustModal from "../components/commonComp/CustModal";
import CustomerForm from "../components/forms/CustomerForm";
import {
  CUSTOMER_FORM,
  NOTIFICATION_FORM,
  NOTIFICATION_VIEW,
  atomNameConst,
} from "../utities/constants";
import NotificationForm from "../components/forms/NotificationForm";
import MemberShipSummary from "../components/MemberShipSummary";
import NotificationView from "../components/forms/NotificationView";
import useSelector from "../store/selector";

const Dashboard = () => {
  const { setRecoilVal } = useSelector();
  const [showModal, setShowModal] = useState(false);
  const [modalFor, setModalFor] = useState(CUSTOMER_FORM);

  const LoadParticularComp = () => {
    switch (modalFor) {
      case CUSTOMER_FORM:
        return <CustomerForm setShowModal={setShowModal} />;
      case NOTIFICATION_FORM:
        return <NotificationForm setShowModal={setShowModal} />;
      case NOTIFICATION_VIEW:
        return <NotificationView setShowModal={setShowModal} />;
      default:
        return <NotificationForm setShowModal={setShowModal} />;
    }
  };

  const loadParticularTitle = () => {
    switch (modalFor) {
      case CUSTOMER_FORM:
        return "Customer Form";
      case NOTIFICATION_FORM:
        return "Notification Form";
      case NOTIFICATION_VIEW:
        return "Notification View";
      default:
        break;
    }
  };

  return (
    <div className="container  p-3">
      <MemberShipSummary />
      <div className="row">
        <div className="col-8">
          <CustomersList
            setShowModal={setShowModal}
            setModalFor={setModalFor}
            onClick={() => {
              setShowModal(true);
              setModalFor(CUSTOMER_FORM);
            }}
          />
        </div>
        <div className="col-4">
          <NotificationsList
            setShowModal={setShowModal}
            setModalFor={setModalFor}
            onHide={() => {
              setShowModal(false);
            }}
            onClick={() => {
              setShowModal(true);
              setModalFor(NOTIFICATION_FORM);
            }}
          />
        </div>
      </div>
      <CustModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setRecoilVal(atomNameConst.NOTIFICATIONSINGLEDATA, null);
        }}
        children={<LoadParticularComp />}
        modalFor={modalFor}
        title={loadParticularTitle()}
      />
    </div>
  );
};

export default Dashboard;
