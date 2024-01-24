import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CUSTOMER_FORM } from "../../utities/constants";

const CustModal = (props) => {
  const { show, onHide, title = "NO Title", children, modalFor } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustModal;
