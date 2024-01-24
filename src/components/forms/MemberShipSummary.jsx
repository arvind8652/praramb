import React, { useEffect, useState } from "react";
import { get } from "../../utities/apiServices";
import CustCard from "../commonComp/CustCard";
import {
  faIndianRupee,
  faPersonWalking,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const MemberShipSummary = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const getMeberShipDetail = async () => {
      const val = await get("memberShipDetail");
      setData(val?.data);
    };
    getMeberShipDetail();
  }, []);
  return (
    <>
      <div className="row text-center">
        <div className="col">
          <CustCard
            icon={faUsers}
            data={data?.totalUsers}
            text="Total Customers"
          />
        </div>
        <div className="col">
          <CustCard
            icon={faPersonWalking}
            data={data?.activeUsers}
            text="Today available Customers"
          />
        </div>
        <div className="col">
          <CustCard
            icon={faIndianRupee}
            data={data?.totalAmount}
            text="Total Amounts"
          />
        </div>
      </div>
    </>
  );
};

export default MemberShipSummary;
