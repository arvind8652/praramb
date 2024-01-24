import React from "react";
import { Form } from "react-bootstrap";

const CustTextAreaField = (props) => {
  const { label, placeholder, type, name } = props;
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <textarea
        class="form-control"
        placeholder={placeholder || label}
        name={name}
        rows="3"
      ></textarea>
    </Form.Group>
  );
};

export default CustTextAreaField;
