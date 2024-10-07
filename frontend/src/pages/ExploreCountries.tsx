import Navbar from "../components/Navbar/Navbar";
import CountryCardList from "../components/CountryCard/CountryCardList";
import Countries from "../data/Countries";
import Filter from "../components/Filter/Filter";
import styles from "../styles/ExploreCountries.module.css";
import Search from "../components/Search/Search";
import {useEffect, useState} from "react";
import {filterAtom} from "../atoms/FilterAtom";
import {useRecoilState} from "recoil";
import {MdOutlineSort} from "react-icons/md";
import {FilterType} from "../types/FilterType";
import {setFilters} from "../utils/FilterStorage";
import {CountryType} from "../types/CountryTypes";

const ExploreCountries = () => {
    const [countries, setCountries] = useState<CountryType[]>(Countries);
    const [filter, setFilter] = useRecoilState<FilterType>(filterAtom);

    // Filter countries based on search, continent filters and sort
    useEffect(() => {
        // Filter countries based on the continent and search filters
        if (!Object.values(filter.continent).includes(true)) {
            setCountries(Countries);
            setCountries((prevCountries) =>
                prevCountries.filter((country) => country.name.toLowerCase().includes(filter.search.toLowerCase())),
            );
        } else {
            setCountries(
                Countries.filter(
                    (country) => filter.continent[country.continent as keyof typeof filter.continent] === true,
                ),
            );
            setCountries((prevCountries) =>
                prevCountries.filter((country) => country.name.toLowerCase().includes(filter.search.toLowerCase())),
            );
        }

        // Apply sorting based on A-Z or Z-A selection
        if (filter.sort === "A-Z") {
            setCountries((prevCountries) => prevCountries.sort((a, b) => a.name.localeCompare(b.name)));
        } else {
            setCountries((prevCountries) => prevCountries.sort((a, b) => b.name.localeCompare(a.name)));
        }

        setFilters(filter);
    }, [filter]);

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            sort: e.target.value,
        }));
    };

    return (
        <>
            <Navbar />
            <main className={styles.maincontainer} role="main" aria-label="Explore Countries">
                <Filter aria-label="Filter based on continents" />
                <div className={styles.maincontent} role="region" aria-labelledby="country-list">
                    <p id="country-list" className={styles.title}>
                        Discover your dream vacations
                    </p>
                    <div className={styles.filters} role="region" aria-labelledby="filter-section">
                        <Search aria-label="Search countries" />
                        <div className={styles.sort} role="region" aria-labelledby="sort-section">
                            <MdOutlineSort className={styles.sorticon} aria-hidden="true" />
                            <label htmlFor="sort-dropdown" className={styles.sorttext}>
                                Sort after:
                            </label>

                            {/* Dropdown to select sorting order (A-Z or Z-A) with aria-label for screen readers */}
                            <select
                                id="sort-dropdown"
                                className={styles.sortdropdown}
                                onChange={handleSort}
                                value={filter.sort}
                                aria-label="Sort countries alphabetically">
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                            </select>
                        </div>
                    </div>
                    <CountryCardList countries={countries} />
                </div>
            </main>
        </>
    );
};

export default ExploreCountries;
