import React from "react";
import { Form } from "react-bootstrap";

const CustSelectField = (props) => {
  const { label, placeholder, type, name } = props;
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Select>
        <option>One</option>
        <option>two</option>
      </Form.Select>
    </Form.Group>
  );
};

export default CustSelectField;
