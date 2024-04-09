import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CustInputField from "../commonComp/CustInputField";
import CustSelectField from "../commonComp/CustSelectField";
import * as formik from "formik";
import {
  paymentFormInitialData,
  paymentFormSchema,
} from "../../utilities/utilities";
import { PAYMENT_MODE_OPTION, atomNameConst } from "../../utilities/constants";
import useSelector from "../../store/selector";
import { get, post, put } from "../../utilities/apiServices";

const PaymentForm = (props) => {
  const { setShowModal } = props;
  const { Formik } = formik;
  const { setRecoilVal, getRecoilVal } = useSelector();
  const customerDataForPayment = getRecoilVal(atomNameConst.CUSTOMERSINGLEDATA);
  const loginDetailData = getRecoilVal(atomNameConst.LOGINDETAIL);

  const [amountDetail, seAmountDetail] = useState([]);

  useEffect(() => {
    const getPaymentsList = async () => {
      try {
        const response = await get(`payments/${customerDataForPayment?._id}`);
        console.log("check response-------", response);
        seAmountDetail(response?.data);
      } catch (error) {
        console.log("getting while fetching---", error);
      }
    };
    getPaymentsList();
    return () => getPaymentsList();
  }, []);

  const handlePostApiForPayment = async (data) => {
    try {
      const resp = await post("payments/add", data);
      const val = await get("customers");
      const summaryData = await get("customers/summary");
      setRecoilVal(atomNameConst.CUSTOMERS, val?.data);
      setRecoilVal(atomNameConst.SUMMARY, summaryData?.data?.[0]);
      setShowModal(false);
      return true;
    } catch (error) {
      console.log("error-------", error.message);
      return false;
    }
  };

  const DataWithLabel = (props) => {
    const { label, data, colMd } = props;
    return (
      <Col md={colMd} className="mb-3">
        <div className="card p-2  bg-white rounded">
          <small className="text-muted">{label}</small>
          <p className="h6">{data}</p>
        </div>
      </Col>
    );
  };

  return (
    <Formik
      validationSchema={paymentFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const reqData = { ...values };
        reqData.custId = customerDataForPayment?._id;
        reqData.adminId = loginDetailData?._id;
        const response = await handlePostApiForPayment(reqData);
        response ? setSubmitting(true) : setSubmitting(false);
      }}
      initialValues={paymentFormInitialData}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date time</th>
                <th scope="col">Amount</th>
                <th scope="col">Mode</th>
                <th scope="col">Transaction Id</th>
              </tr>
            </thead>
            <tbody>
              {amountDetail?.payedAmountList?.length > 0 &&
                amountDetail?.payedAmountList?.map((val, index) => {
                  return (
                    <tr key={val._id}>
                      <td>{index + 1}</td>
                      <td>{val.createdAt}</td>
                      <td>{val.payingAmount}</td>
                      <td>{val.mode}</td>
                      <td>{val.transactionId}</td>
                    </tr>
                  );
                })}
              {amountDetail?.payedAmountList?.length === 0 && (
                <tr key={"no record"}>
                  <td colSpan={5} align="center" style={{ fontWeight: 600 }}>
                    No, Payment done yet.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {amountDetail?.remainingAmount > 0 && (
            <Row>
              <hr />
              <DataWithLabel
                label={"Total Amount"}
                data={amountDetail?.totalAmount}
                colMd="4"
              />
              <DataWithLabel
                label={"Remaining Amount"}
                data={amountDetail?.remainingAmount}
                colMd="4"
              />
              <Col md="4" className="mb-3">
                <CustInputField
                  label={"Paying Amount"}
                  type={"text"}
                  name={"payingAmount"}
                  onChange={handleChange}
                  value={values?.payingAmount}
                  error={errors.payingAmount}
                  isValid={touched.payingAmount && !errors.payingAmount}
                  isInvalid={!!errors.payingAmount}
                />
              </Col>
              <Col md="4" className="mb-3">
                <CustSelectField
                  option={PAYMENT_MODE_OPTION}
                  label={"Payment Mode"}
                  name={"mode"}
                  onChange={handleChange}
                  value={values?.mode}
                  error={errors.mode}
                  isValid={touched.mode && !errors.mode}
                  isInvalid={!!errors.mode}
                />
              </Col>
              <Col md="4" className="mb-3">
                <CustInputField
                  label={"Transaction Id"}
                  type={"text"}
                  name={"transactionId"}
                  onChange={handleChange}
                  value={values?.transactionId}
                  error={errors.transactionId}
                  isValid={touched.transactionId && !errors.transactionId}
                  isInvalid={!!errors.transactionId}
                />
              </Col>

              <hr />
              <Col md="12" className=" d-flex justify-content-center">
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
