import React from "react";
import { Form } from "react-bootstrap";

const CustSelectField = (props) => {
  const { label, placeholder, type, name } = props;
  return (
    <Form.Group className="card p-2 shadow-sm bg-white rounded">
      <Form.Label>{label}</Form.Label>
      <Form.Select className="bg-light">
        <option>One</option>
        <option>two</option>
      </Form.Select>
    </Form.Group>
  );
};

export default CustSelectField;
