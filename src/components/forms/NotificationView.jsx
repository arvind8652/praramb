import React from "react";
import useSelector from "../../store/selector";
import { atomNameConst } from "../../utities/constants";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const DataWithLabel = (props) => {
  const { label, data, colMd } = props;
  return (
    <Col md={colMd} className="mb-3">
      <small className="text-muted">{label}</small>
      <p className="h5">{data}</p>
    </Col>
  );
};

const NotificationView = () => {
  const { getRecoilVal } = useSelector();
  const data = getRecoilVal(atomNameConst.NOTIFICATIONSINGLEDATA);
  return (
    <>
      <p className="d-flex justify-content-end m-0 p-0">
        <FontAwesomeIcon
          icon={faPencil}
          style={{ cursor: "pointer" }}
          title="edit"
        />
        <div className="vr mx-2"></div>
        <FontAwesomeIcon
          icon={faTrash}
          style={{ cursor: "pointer" }}
          title="delete"
        />
      </p>
      <Row>
        <DataWithLabel label={"Title"} data={data?.title} colMd="6" />
        <DataWithLabel label={"Type"} data={data?.type} colMd="6" />
        <DataWithLabel
          label={"Description"}
          data={data?.description}
          colMd="12"
        />
      </Row>
    </>
  );
};

export default NotificationView;
