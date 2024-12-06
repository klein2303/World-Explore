import { atom } from "recoil";

export const notificationAtom = atom<string | null>({
    key: "notificationAtom",
    default: null,
});
