import { FilterType } from "../types/FilterType";

export const setFilters = (filters: FilterType) => {
    sessionStorage.setItem("filters", JSON.stringify(filters));
}

export const getFilters = (): FilterType => {
    const defaultFilters: FilterType = {
        continent: {
            Africa: false,
            Asia: false,
            Europe: false,
            "North America": false,
            Oceania: false,
            "South America": false,
        },
        search: "",
    } 
    
    return JSON.parse(sessionStorage.getItem("filters") || JSON.stringify(defaultFilters));
}