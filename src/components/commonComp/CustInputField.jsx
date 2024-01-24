import React from "react";
import { Form } from "react-bootstrap";

const CustInputField = (props) => {
  const { label, placeholder, type, name } = props;
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder || label}
        name={name}
      />
    </Form.Group>
  );
};

export default CustInputField;
