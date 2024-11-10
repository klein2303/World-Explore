export type JournalTypeRead = {
    country: string;
    reviews: readReviewType[];
};

export type JournalTypeWrite = {
    country: string;
    reviews: writeReviewType[];
};

export type readReviewType = {
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

export type writeReviewType = {
    title: string;
    date: string;
    rating: number;
    text: string;
    public: boolean;
    journal: {
        profile: {
            email: string;
        };
    };
}