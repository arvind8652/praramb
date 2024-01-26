import React from "react";
import { Form } from "react-bootstrap";

const CustSelectField = (props) => {
  const { label, placeholder, type, name, error } = props;
  return (
    <Form.Group className="card p-2 shadow-sm bg-white rounded">
      <Form.Label>{label}</Form.Label>
      <Form.Select {...props} className="bg-light">
        <option>One</option>
        <option>two</option>
      </Form.Select>

      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default CustSelectField;
