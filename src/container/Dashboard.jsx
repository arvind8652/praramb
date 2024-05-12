import React, { useEffect, useState } from "react";
import NotificationsList from "../components/NotificationsList";
import CustomersList from "../components/CustomersList";
import CustModal from "../components/commonComp/CustModal";
import CustomerForm from "../components/forms/CustomerForm";
import {
  CUSTOMER_DELETE,
  CUSTOMER_EDIT,
  CUSTOMER_FORM,
  CUSTOMER_VIEW,
  LOGIN_FORM,
  CHAT,
  NOTIFICATION_DELETE,
  NOTIFICATION_EDIT,
  NOTIFICATION_FORM,
  NOTIFICATION_VIEW,
  PAYMENT_FORM,
  atomNameConst,
} from "../utilities/constants";
import NotificationForm from "../components/forms/NotificationForm";
import MemberShipSummary from "../components/MemberShipSummary";
import NotificationView from "../components/forms/NotificationView";
import useSelector from "../store/selector";
import NotificationDelete from "../components/forms/NotificationDelete";
import CustomerView from "../components/forms/CustomerView";
import CustomerDelete from "../components/forms/CustomerDelete";
import LoginForm from "../components/forms/LoginForm";
import Header from "../components/Header";
import BarChartvic from "../components/BarChartvic";
import PaymentForm from "../components/forms/PaymentForm";
import QRCodeGenerator from "../components/GenerateQR";
import Chat from "../components/forms/Chat";

const Dashboard = () => {
  const { setRecoilVal, getRecoilVal } = useSelector();
  const [showModal, setShowModal] = useState(false);
  const [modalFor, setModalFor] = useState("");

  useEffect(() => {
    if (!getRecoilVal(atomNameConst?.LOGINDETAIL)) {
      setShowModal(true);
      setModalFor(LOGIN_FORM);
    }
    return () => {
      setModalFor("");
      setShowModal(false);
    };
  }, []);

  const LoadParticularComp = () => {
    switch (modalFor) {
      case CHAT:
        return <Chat setShowModal={setShowModal} />;
      case LOGIN_FORM:
        return <LoginForm setShowModal={setShowModal} />;
      case CUSTOMER_FORM:
        return <CustomerForm setShowModal={setShowModal} formType="new" />;
      case CUSTOMER_EDIT:
        return <CustomerForm setShowModal={setShowModal} formType="edit" />;
      case CUSTOMER_VIEW:
        return (
          <CustomerView
            setShowModal={setShowModal}
            setModalFor={setModalFor}
            formType="view"
          />
        );
      case CUSTOMER_DELETE:
        return <CustomerDelete setShowModal={setShowModal} formType="delete" />;

      case NOTIFICATION_FORM:
        return <NotificationForm setShowModal={setShowModal} formType="new" />;
      case NOTIFICATION_EDIT:
        return <NotificationForm setShowModal={setShowModal} formType="edit" />;
      case NOTIFICATION_DELETE:
        return (
          <NotificationDelete setShowModal={setShowModal} formType="delete" />
        );
      case NOTIFICATION_VIEW:
        return (
          <NotificationView
            setShowModal={setShowModal}
            setModalFor={setModalFor}
            formType="view"
          />
        );
      case PAYMENT_FORM:
        return <PaymentForm setShowModal={setShowModal} formType="new" />;
      default:
        return <NotificationForm setShowModal={setShowModal} />;
    }
  };

  const loadParticularTitle = () => {
    switch (modalFor) {
      case CHAT:
        return "Message to Customer";
      case LOGIN_FORM:
        return "Login Form";
      case CUSTOMER_FORM:
        return "Customer Form";
      case CUSTOMER_EDIT:
        return "Customer Edit";
      case CUSTOMER_VIEW:
        return "Customer View";
      case CUSTOMER_DELETE:
        return "Customer Delete";
      case NOTIFICATION_FORM:
        return "Notification Form";
      case NOTIFICATION_VIEW:
        return "Notification View";
      case NOTIFICATION_EDIT:
        return "Notification Edit";
      case NOTIFICATION_DELETE:
        return "Notification Delete";
      case PAYMENT_FORM:
        return "Payment Form";
      default:
        break;
    }
  };

  return (
    <>
      <Header setShowModal={setShowModal} setModalFor={setModalFor} />
      <div className="container  p-3">
        <QRCodeGenerator />
        <MemberShipSummary />
        <div className="row">
          <div className="col-12 col-md-8">
            <CustomersList
              setShowModal={setShowModal}
              setModalFor={setModalFor}
              onClick={() => {
                setShowModal(true);
                setModalFor(CUSTOMER_FORM);
              }}
            />
          </div>
          <div className="col-12 col-md-4">
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
          defaultCloseBtn={modalFor === LOGIN_FORM ? false : true}
        />
      </div>
      {/* <BarChartvic /> */}
    </>
  );
};

export default Dashboard;
