import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CustInputField from "../commonComp/CustInputField";
import CustTextAreaField from "../commonComp/CustTextAreaField";
import * as formik from "formik";
import { get, post, put } from "../../utilities/apiServices";
import useSelector from "../../store/selector";
import { atomNameConst } from "../../utilities/constants";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { chatInitialData, chatSchema } from "../../utilities/utilities";
import { getTime } from "../../utilities/commonFun";

const Chat = (props) => {
  const { setShowModal, formType } = props;
  const { Formik } = formik;
  // const [upDateMsg, setUpDateMsg] = useState(false);
  const { setRecoilVal, getRecoilVal } = useSelector();
  const customerDetail = getRecoilVal(atomNameConst.CUSTOMERSINGLEDATA);
  const loginDetail = getRecoilVal(atomNameConst.LOGINDETAIL)?.user;
  const messageDetail = getRecoilVal(atomNameConst.CHAT);
  console.log("check the messageDetail--------", messageDetail);
  console.log("check the messageDetail-type of-------", typeof messageDetail);

  const divRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = divRef.current;
      console.log("check the scrollTop-----", scrollTop);
      console.log("check the scrollHeight-----", scrollHeight);
      console.log("check the clientHeight-----", clientHeight);
      if (Math.round(scrollTop) + clientHeight >= scrollHeight) {
        alert("reached the end of the div");
        handleUpdateChat();
      } else {
        console.log("waiting.........");
      }
    };

    const divElement = divRef.current;
    divElement.addEventListener("scroll", handleScroll);
    if (divRef.current?.scrollHeight === divRef.current?.clientHeight) {
      handleUpdateChat();
    }
    return () => {
      divElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleUpdateChat = async () => {
    try {
      const resp = await get(`chat/messageReaded/${loginDetail?._id}`);
      console.log("check response----------", resp);
      // setUpDateMsg(true);
    } catch (error) {
      console.log("check we are facing issue--------", error);
    }
  };

  const handlePostApiForChat = async (data) => {
    const reqData = {
      senderId: loginDetail?._id,
      receiverId: customerDetail?._id,
      message: data?.chat,
    };
    const completeMsgList = [...messageDetail];
    try {
      const resp = await post("chat/add", reqData);
      // const resp =
      //   formType === "edit"
      //     ? await put(
      //         `notifications/edit/${notificationDataForEdit?._id}`,
      //         data
      //       )
      //     : await post("notifications/add", data);
      completeMsgList.push(reqData);
      setRecoilVal(atomNameConst.CHAT, completeMsgList);
      console.log("check data-----", reqData);
      return true;
    } catch (error) {
      console.log("error-------", error.message);
      return false;
    }
  };

  const MessageContainer = ({ data }) => {
    return (
      <>
        <p
          style={{
            backgroundColor: "lightgray",
            display: "inline-block",
            borderRadius: "4px",
            padding: "0px 5px 0px 5px",
          }}
        >
          <p style={{ marginBottom: "1px" }}>
            {data?.message}
            <sub style={{ marginLeft: "5px" }}>
              {getTime(data?.createdAt, "chat")}
            </sub>
          </p>
        </p>
      </>
    );
  };

  const SendMessages = ({ data }) => (
    <div style={{ textAlign: "right" }}>
      <MessageContainer data={data} />
    </div>
  );
  const ReceivedMessages = ({ data }) => (
    <div style={{ textAlign: "left" }}>
      <MessageContainer data={data} />
    </div>
  );
  return (
    <div style={{ height: "50%" }}>
      <Formik
        validationSchema={chatSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await handlePostApiForChat(values);
          response ? setSubmitting(true) : setSubmitting(false);
        }}
        initialValues={chatInitialData}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            style={{ padding: "0 15px 0 15px" }}
          >
            <Row
              ref={divRef}
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                scrollbarWidth: "thin",
              }}
            >
              {messageDetail &&
                messageDetail?.map((data) => {
                  if (data?.senderId === loginDetail?._id) {
                    return <SendMessages data={data} />;
                  } else {
                    return <ReceivedMessages data={data} />;
                  }
                })}
              {messageDetail?.length < 1 && (
                <p style={{ color: "gray", textAlign: "center" }}>
                  Start new conversation
                </p>
              )}
            </Row>
            <hr />
            <Row>
              <Col md={11} sm={11} xs={11}>
                <CustInputField
                  type={"text"}
                  name={"chat"}
                  onChange={handleChange}
                  value={values?.chat}
                />
              </Col>
              <Col
                md={1}
                sm={1}
                xs={1}
                style={{
                  backgroundColor: values?.chat ? "greenyellow" : "grey",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: values?.chat ? "pointer" : "not-allowed",
                }}
                onClick={handleSubmit}
              >
                <FontAwesomeIcon icon={faPaperPlane} size="1x" />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Chat;
