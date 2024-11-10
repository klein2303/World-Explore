export type JournalType = {
    country: string;
    reviews: reviewType[];
};

export type reviewType = {
    id: number;
    title: string;
    date: string;
    rating: number;
    text: string;
    public: boolean;
    journal: {
        profile: {
            username: string;
        };
    };
};
