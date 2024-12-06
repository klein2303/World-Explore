import { atom } from "recoil";

export const journalSearchAtom = atom({
    key: "journalSearchAtom",
    default: {
        search: "",
    },
});
