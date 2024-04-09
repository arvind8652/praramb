import React, { useEffect, useState } from "react";
import { get } from "../utilities/apiServices";
import CustCard from "./commonComp/CustCard";
import {
  faIndianRupee,
  faPersonWalking,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import useSelector from "../store/selector";
import { atomNameConst } from "../utilities/constants";

const MemberShipSummary = () => {
  const { getRecoilVal, setRecoilVal } = useSelector();
  const [data, setData] = useState({});
  useEffect(() => {
    const getMeberShipDetail = async () => {
      const val = await get("customers/summary");
      setRecoilVal(atomNameConst.SUMMARY, val?.data?.[0]);

      // setData(val?.data);
    };
    getMeberShipDetail();
  }, []);
  return (
    <>
      <div className="row text-center">
        <div className="col">
          <CustCard
            icon={faUsers}
            // data={data?.totalUsers}
            data={getRecoilVal(atomNameConst.SUMMARY)?.totalCustomers}
            text="Total Customers"
          />
        </div>
        <div className="col">
          <CustCard
            icon={faPersonWalking}
            data={getRecoilVal(atomNameConst.SUMMARY)?.totalActiveCustomers}
            text="Today active Customers"
          />
        </div>
        <div className="col">
          <CustCard
            icon={faIndianRupee}
            data={getRecoilVal(atomNameConst.SUMMARY)?.totalAmount}
            text="Total Amount"
          />
        </div>
      </div>
    </>
  );
};

export default MemberShipSummary;
