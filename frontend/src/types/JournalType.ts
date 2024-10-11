export type JournalType = {
    country: string;
    reviews: reviewType[];
};

type reviewType = {
    id: number;
    title: string;
    date: string;
    rating: number;
    text: string;
    public: boolean;
};
