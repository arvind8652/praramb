import { useRecoilState } from "recoil";
import { notificationSingleData, notifications } from "../atoms";
import { atomNameConst } from "../../utities/constants";

const useSelector = () => {
  const [notificationsVal, setNotificationsVal] = useRecoilState(notifications);
  const [notificationSingleDataVal, setNotificationSingleDataVal] =
    useRecoilState(notificationSingleData);

  const getRecoilVal = (atomName) => {
    switch (atomName) {
      case atomNameConst.NOTIFICATIONS:
        return notificationsVal;
      case atomNameConst.NOTIFICATIONSINGLEDATA:
        return notificationSingleDataVal;
      default:
        throw new Error(`Unknown atom name:${atomName}`);
    }
  };

  const setRecoilVal = (atomName, data) => {
    switch (atomName) {
      case atomNameConst.NOTIFICATIONS:
        setNotificationsVal(data);
        break;
      case atomNameConst.NOTIFICATIONSINGLEDATA:
        setNotificationSingleDataVal(data);
        break;
      default:
        throw new Error(`Unknown atom name:${atomName}`);
    }
  };

  return { getRecoilVal, setRecoilVal };
};

export default useSelector;
