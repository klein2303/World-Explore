import {atom} from "recoil";

export const pageAtom = atom({
    key: "pageAtom",
    default: {
        page: 1,
    },
});