import React from "react";
import { Form } from "react-bootstrap";

const CustInputField = (props) => {
  const { label, placeholder, type, name } = props;
  return (
    <Form.Group className="card p-2 shadow-sm bg-white rounded">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className="bg-light"
        type={type}
        placeholder={placeholder || label}
        name={name}
        {...props}
      />
    </Form.Group>
  );
};

export default CustInputField;
