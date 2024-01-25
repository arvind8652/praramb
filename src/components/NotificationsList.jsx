import React, { useEffect, useState } from "react";
import CustOverLay from "./commonComp/CustOverlay";
import { get } from "../utities/apiServices";

const NotificatonsList = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getNotificationsList = async () => {
      const val = await get("notificationsList");
      setData(val?.data);
    };
    getNotificationsList();
  }, []);
  return (
    <div className="card  shadow p-3 mb-5 bg-white rounded">
      <div className="card-header d-flex justify-content-between">
        <h4 className="my-auto">Notification</h4>
        <button className="btn btn-primary btn-sm" {...props}>
          Add
        </button>
      </div>
      <ul className="list-group list-group-flush">
        {data?.map((val) => {
          return (
            <li
              key={val.id}
              className="list-group-item list-group-item-action d-flex justify-content-between"
            >
              {val.title}
              <CustOverLay />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotificatonsList;
