import { Col, FormGroup, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CustInputField from "../commonComp/CustInputField";
import CustTextAreaField from "../commonComp/CustTextAreaField";

const NotificationForm = () => {
  return (
    <Form>
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
      </Row>
    </Form>
  );
};

export default NotificationForm;
