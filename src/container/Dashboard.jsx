import React, { useState } from "react";
import NotificationsList from "../components/NotificationsList";
import CustomersList from "../components/CustomersList";
import CustModal from "../components/commonComp/CustModal";
import CustomerForm from "../components/forms/CustomerForm";
import {
  CUSTOMER_FORM,
  NOTIFICATION_DELETE,
  NOTIFICATION_EDIT,
  NOTIFICATION_FORM,
  NOTIFICATION_VIEW,
  atomNameConst,
} from "../utities/constants";
import NotificationForm from "../components/forms/NotificationForm";
import MemberShipSummary from "../components/MemberShipSummary";
import NotificationView from "../components/forms/NotificationView";
import useSelector from "../store/selector";
import NotificationDelete from "../components/forms/NotificationDelete";

const Dashboard = () => {
  const { setRecoilVal } = useSelector();
  const [showModal, setShowModal] = useState(false);
  const [modalFor, setModalFor] = useState(CUSTOMER_FORM);

  const LoadParticularComp = () => {
    switch (modalFor) {
      case CUSTOMER_FORM:
        return <CustomerForm setShowModal={setShowModal} />;
      case NOTIFICATION_FORM:
        return <NotificationForm setShowModal={setShowModal} formType="new" />;
      case NOTIFICATION_EDIT:
        return <NotificationForm setShowModal={setShowModal} formType="edit" />;
      case NOTIFICATION_DELETE:
        return (
          <NotificationDelete setShowModal={setShowModal} formType="delete" />
        );
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
      case NOTIFICATION_EDIT:
        return "Notification Edit";
      case NOTIFICATION_DELETE:
        return "Notification Delete";
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
