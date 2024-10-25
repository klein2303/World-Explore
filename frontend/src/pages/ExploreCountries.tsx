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

const ExploreCountries = () => {
    const [filter, setFilter] = useRecoilState<FilterType>(filterAtom);
    const [currentPage, setCurrentPage] = useRecoilState(pageAtom);

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
    });

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            sort: e.target.value,
        }));
        resetPage();
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage({ page: value });
    };

    const resetPage = () => {
        if (currentPage.page === 1) {
            return;
        }
        setCurrentPage({
            page: 1,
        });
    };

    // useEffect(() => {
    //     resetPage()
    // }, [filter]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <Navbar />
            <main className={styles.maincontainer} role="main" aria-label="Explore Countries">
                <div className={styles.container}>
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
                        <CountryCardList />
                        <Pagination
                            page={currentPage.page}
                            onChange={handleChange}
                            count={Math.ceil(data.filteredcountriescount / 12)}
                            className={styles.pagination}
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default ExploreCountries;
