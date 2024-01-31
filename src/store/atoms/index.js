import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({ storage: localStorage });

export const notifications = atom({
  key: "notifications",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
