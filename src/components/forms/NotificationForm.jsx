import { Button, Col, FormGroup, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CustInputField from "../commonComp/CustInputField";
import CustTextAreaField from "../commonComp/CustTextAreaField";
import { useState } from "react";

const initialData = {
  title: "",
  type: "",
  description: "",
};

const NotificationForm = () => {
  const [notificationForm, setNotificationForm] = useState(initialData);

  const handleChange = (e) => {
    setNotificationForm({
      ...notificationForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostApiForNotification = async () => {
    console.log("filled data----", notificationForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlePostApiForNotification();
    setNotificationForm(initialData);
  };

  return (
    <Form onSubmit={handleSubmit} onChange={handleChange}>
      <Row>
        <Col md="6" className="mb-3">
          <CustInputField label={"Title"} type={"text"} name={"title"} />
        </Col>
        <Col md="6" className="mb-3">
          <CustInputField label={"Type"} type={"text"} name={"type"} />
        </Col>
        <Col md="12" className="mb-3">
          <CustTextAreaField label={"Description"} name={"description"} />
        </Col>
        <hr />
        <Col md="12" className=" d-flex justify-content-center">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default NotificationForm;
