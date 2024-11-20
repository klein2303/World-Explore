import Navbar from "../components/Navbar/Navbar";
import CountryCardList from "../components/CountryCard/CountryCardList";
import Filter from "../components/Filter/Filter";
import styles from "../styles/ExploreCountries.module.css";
import Search from "../components/Search/Search";
import { filterAtom } from "../atoms/FilterAtom";
import { useRecoilState } from "recoil";
import { MdOutlineSort } from "react-icons/md";
import { FilterType } from "../types/FilterType";
import { gql, useQuery } from "@apollo/client";
import Pagination from "@mui/material/Pagination";
import { pageAtom } from "../atoms/PageAtom";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

const ExploreCountries = () => {
    const { theme } = useTheme();

    const [filter, setFilter] = useRecoilState<FilterType>(filterAtom);
    const [currentPage, setCurrentPage] = useRecoilState(pageAtom);
    const [noResults, setNoResults] = useState<boolean>(false);

    const COUNTRIES_COUNT = gql`
        {
            filteredcountriescount(name: "${filter.search}", continents: [${
                Object.entries(filter.continent)
                    .filter(([continent, value]) => value === true && continent)
                    .map(([continent]) => `"${continent}"`)
                    .join(", ") || '"Asia", "Africa", "Europe", "North America", "South America", "Oceania"'
            }])
        }
    `;

    const { data, loading, error } = useQuery(COUNTRIES_COUNT, {
        fetchPolicy: "cache-first", // Used for first execution
        nextFetchPolicy: "cache-first", // Used for subsequent executions
        onCompleted: (data) => {
            if (data.filteredcountriescount === 0) {
                setNoResults(true);
            } else {
                setNoResults(false);
            }
        },
    });

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            sort: e.target.value,
        }));
        resetPage();
    };

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage({ page: value });
    };

    const resetPage = useCallback(() => {
        setCurrentPage({ page: 1 });
    }, [setCurrentPage]);

    useEffect(() => {
        resetPage();
    }, [filter.search, filter.continent, resetPage]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <Navbar />
            <main className={styles.maincontainer} role="main" aria-label="Explore Countries">
                <div className={styles.container}>
                    <Filter aria-label="Filter based on continents" />
                    <div className={styles.maincontent} role="region" aria-describedby="country-list">
                        <p id="country-list" className={styles.title}>
                            Discover your dream vacations
                        </p>
                        <div className={styles.filters} role="region" aria-label="search and sort">
                            <Search aria-label="Search countries" />
                            <div className={styles.sort} role="region" aria-label="sort-section">
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
                                    <option value="A-Z" aria-label="Sort" aria-description="Sort countries from A to Z">
                                        A-Z
                                    </option>
                                    <option value="Z-A" aria-label="Sort" aria-description="Sort countries from Z to A">
                                        Z-A
                                    </option>
                                </select>
                            </div>
                        </div>
                        <CountryCardList aria-description="Listview of countries" />
                        {noResults ? (
                            <p className={styles.noResultsMessage}>
                                No results found for the selected filter and search options.
                            </p>
                        ) : (
                            <>
                                <Pagination
                                    page={currentPage.page}
                                    onChange={handleChange}
                                    count={Math.ceil(data.filteredcountriescount / 12)}
                                    className={styles.pagination}
                                    aria-label="browse pages"
                                    sx={
                                        theme === "dark"
                                            ? {
                                                  ".MuiPaginationItem-root": {
                                                      color: "white",
                                                  },
                                                  ".MuiButtonBase-root:hover, .MuiPaginationItem-root.Mui-selected:hover":
                                                      {
                                                          backgroundColor: "#333",
                                                      },
                                                  ".MuiPaginationItem-root.Mui-selected": {
                                                      backgroundColor: "#666262",
                                                  },
                                              }
                                            : {}
                                    }
                                />
                            </>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default ExploreCountries;
