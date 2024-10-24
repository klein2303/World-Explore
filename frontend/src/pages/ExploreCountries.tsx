import Navbar from "../components/Navbar/Navbar";
import CountryCardList from "../components/CountryCard/CountryCardList";
import Filter from "../components/Filter/Filter";
import styles from "../styles/ExploreCountries.module.css";
import Search from "../components/Search/Search";
import {filterAtom} from "../atoms/FilterAtom";
import {useRecoilState} from "recoil";
import {MdOutlineSort} from "react-icons/md";
import {FilterType} from "../types/FilterType";

const ExploreCountries = () => {
    const [filter, setFilter] = useRecoilState<FilterType>(filterAtom);

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
                        <CountryCardList/>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ExploreCountries;
