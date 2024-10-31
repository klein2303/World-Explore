export type JournalType = {
    country: string;
    reviews: reviewType[];
};

export type reviewType = {
    title: string;
    date: string;
    rating: number;
    text: string;
    public: boolean;
};
