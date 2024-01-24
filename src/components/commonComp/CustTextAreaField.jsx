import React from "react";
import { Form } from "react-bootstrap";

const CustTextAreaField = (props) => {
  const { label, placeholder, type, name } = props;
  return (
    <Form.Group className="card p-2 shadow-sm bg-white rounded">
      <Form.Label>{label}</Form.Label>
      <textarea
        className="form-control bg-light"
        placeholder={placeholder || label}
        name={name}
        rows="3"
      ></textarea>
    </Form.Group>
  );
};

export default CustTextAreaField;
