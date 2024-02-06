import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CustInputField from "../commonComp/CustInputField";
import * as formik from "formik";
import { loginFormInitialData, loginFormSchema } from "../../utities/utilities";
import { get, post } from "../../utities/apiServices";
import useSelector from "../../store/selector";
import { atomNameConst } from "../../utities/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const LoginForm = (props) => {
  const { setShowModal } = props;
  const { Formik } = formik;
  const { setRecoilVal, getRecoilVal } = useSelector();

  const handlePostApiForLogin = async (data) => {
    try {
      const resp = await post("notifications/add", data);
      const val = await get("notifications");
      setRecoilVal(atomNameConst.NOTIFICATIONS, val?.data);
      setShowModal(false);
      return true;
    } catch (error) {
      console.log("error-------", error.message);
      return false;
    }
  };

  return (
    <Formik
      validationSchema={loginFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const response = await handlePostApiForLogin(values);
        response ? setSubmitting(true) : setSubmitting(false);
      }}
      initialValues={loginFormInitialData}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col
              md={6}
              className=""
              style={{ textAlignLast: "center", alignSelf: "center" }}
            >
              <FontAwesomeIcon icon={faRightToBracket} size="10x" />
              <h5>LOGIN</h5>
            </Col>
            <Col md={6}>
              <Col md={12} className="mb-3">
                <CustInputField
                  label={"User Name"}
                  type={"text"}
                  name={"userName"}
                  onChange={handleChange}
                  value={values?.userName}
                  error={errors.userName}
                  isValid={touched.userName && !errors.userName}
                  isInvalid={!!errors.userName}
                />
              </Col>
              <Col md={12} className="mb-3">
                <CustInputField
                  label={"Password"}
                  type={"text"}
                  name={"password"}
                  onChange={handleChange}
                  value={values?.password}
                  error={errors.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                />
              </Col>
            </Col>
            <hr />
            <Col md="12" className=" d-flex justify-content-center">
              <Button type="submit" variant="primary">
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
