export type FilterType = {
    continent: ContinentType;
    search: string;
    sort: string;
};

type ContinentType = {
    Africa: boolean;
    Asia: boolean;
    Europe: boolean;
    "North America": boolean;
    Oceania: boolean;
    "South America": boolean;
}