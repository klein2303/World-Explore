import styles from "./CountryCardList.module.css";
import CountryCard from "./CountryCard";
import {CountryType} from "../../types/CountryTypes";
import { FilterType } from "../../types/FilterType";
import { gql, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { filterAtom } from "../../atoms/FilterAtom";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const CountryCardList = () => {
    const [filter] = useRecoilState(filterAtom);
    const [currentPage, setCurrentPage] = useState(1);

    // Query to fetch countries data from the backend
    const COUNTRIES = gql`
        {
            filteredcountries(skip: ${currentPage > 0 ? (currentPage - 1) * 12 : 0}, name: "${filter.search}", continents: [${Object.entries(filter.continent).filter(([continent, value]) => value === true).map(([continent]) => `"${continent}"`).join(", ") || '"Asia", "Africa", "Europe", "North America", "South America", "Oceania"'}], sort: ${filter.sort === "A-Z"}) 
            {
                name
                capital
                continent
                image
            }
        }
    `;

    const { data, loading, error } = useQuery(COUNTRIES, {
        fetchPolicy: "cache-first", // Used for first execution
        nextFetchPolicy: "cache-first", // Used for subsequent executions
    });    


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <main className={styles.cardlist} role="list">
            {data.filteredcountries.map((country: CountryType) => (
                <div role="listitem" key={country.name} className={styles.listitem}>
                    <CountryCard name={country.name} image={country.image} />
                </div>
            ))}
        </main>
    );
};

export default CountryCardList;
