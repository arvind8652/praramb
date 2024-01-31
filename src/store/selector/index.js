import { useRecoilState } from "recoil";
import { notifications } from "../atoms";
import { atomNameConst } from "../../utities/constants";

const useSelector = () => {
  const [notificationsVal, setNotificationsVal] = useRecoilState(notifications);

  const getRecoilVal = (atomName) => {
    switch (atomName) {
      case atomNameConst.NOTIFICATIONS:
        return notificationsVal;
      default:
        throw new Error(`Unknown atom name:${atomName}`);
    }
  };

  const setRecoilVal = (atomName, data) => {
    switch (atomName) {
      case atomNameConst.NOTIFICATIONS:
        setNotificationsVal(data);
        break;
      default:
        throw new Error(`Unknown atom name:${atomName}`);
    }
  };

  return { getRecoilVal, setRecoilVal };
};

export default useSelector;
