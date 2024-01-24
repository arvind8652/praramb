import { Col, FormGroup, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CustInputField from "../commonComp/CustInputField";
import CustSelectField from "../commonComp/CustSelectField";
import CustTextAreaField from "../commonComp/CustTextAreaField";

const CustomerForm = () => {
  return (
    <Form>
      <Row>
        <Col md="4" className="mb-3">
          <CustInputField
            label={"First Name"}
            type={"text"}
            name={"firstName"}
          />
        </Col>
        <Col md="4" className="mb-3">
          <CustInputField label={"Last Name"} type={"text"} name={"lastName"} />
        </Col>
        <Col md="4" className="mb-3">
          <CustInputField label={"DOB"} type={"date"} name={"dob"} />
        </Col>
        <Col md="4" className="mb-3">
          <CustInputField label={"Mobile No"} type={"text"} name={"mobileNo"} />
        </Col>
        <Col md="4" className="mb-3">
          <CustInputField label={"Email"} type={"email"} name={"email"} />
        </Col>
        <Col md="4" className="mb-3">
          <CustInputField label={"Role"} type={"text"} name={"role"} />
        </Col>
        <Col md="4" className="mb-3">
          <CustInputField
            label={"Start Date"}
            type={"date"}
            name={"startDate"}
          />
        </Col>
        <Col md="4" className="mb-3">
          <CustInputField label={"End Date"} type={"date"} name={"endDate"} />
        </Col>
        <Col md="4" className="mb-3">
          <CustSelectField label={"Status"} />
        </Col>
        <Col md="4" className="mb-3">
          <CustInputField label={"Amount"} type={"text"} name={"amount"} />
        </Col>
        <Col md="4" className="mb-3">
          <CustInputField label={"Gender"} type={"text"} name={"gender"} />
        </Col>

        <Col md="12" className="mb-3">
          <CustTextAreaField label={"Comment"} name={"comment"} />
        </Col>
      </Row>
    </Form>
  );
};

export default CustomerForm;
