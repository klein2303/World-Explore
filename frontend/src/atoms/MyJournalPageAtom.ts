import { atom } from "recoil";

export const myJournalPageAtom = atom({
    key: "myJournalPageAtom",
    default: {
        page: 1,
    },
});
