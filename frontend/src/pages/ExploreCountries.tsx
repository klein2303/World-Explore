import Navbar from "../components/Navbar/Navbar";
import CountryCardList from "../components/CountryCard/CountryCardList";
import Countrys from "../data/Countrys";
import Filter from "../components/Filter/Filter";
import styles from "../styles/ExploreCountries.module.css";
import Search from "../components/Search/Search";
import { useEffect, useState } from "react";
import { filterAtom } from "../atoms/FilterAtom";
import { useRecoilState} from "recoil";
import { MdOutlineSort } from "react-icons/md";
import { FilterType } from "../types/FilterType";
import { setFilters } from "../utils/FilterStorage";

const ExploreCountries = () => {
    const [countries, setCountries] = useState(Countrys);
    const [filter, setFilter] = useRecoilState<FilterType>(filterAtom);

    // Filter countries based on search and continent filters
    useEffect(() => {
        if (!Object.values(filter.continent).includes(true)) {
            setCountries(Countrys);
            setCountries((prevCountries) => prevCountries.filter((country) => country.name.toLowerCase().includes(filter.search.toLowerCase())));
        }
        else {
            setCountries(Countrys.filter((country) => filter.continent[country.continent as keyof typeof filter.continent] === true));
            setCountries((prevCountries) => prevCountries.filter((country) => country.name.toLowerCase().includes(filter.search.toLowerCase())));
        }

        if (filter.sort === "A-Z") {
            setCountries((prevCountries) => prevCountries.sort((a, b) => a.name.localeCompare(b.name)));
        }
        else {
            setCountries((prevCountries) => prevCountries.sort((a, b) => b.name.localeCompare(a.name)));
        }

    }, [Countrys, filter]);

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            sort: e.target.value,
        }));
    }

    useEffect(() => {
        setFilters(filter);
    }, [filter]);

    return (
        <>
            <Navbar />
            <main className={styles.maincontainer}>
                <Filter />
                <div className={styles.maincontent}>
                    <p className={styles.title}>Discover your dream vacations</p>
                    <div className={styles.filters}>
                        <Search />
                        <div className={styles.sort}>
                            <MdOutlineSort className={styles.sorticon}/>
                            <p className={styles.sorttext}>Sort after:</p>
                            <select className={styles.sortdropdown} onChange={handleSort} value={filter.sort}>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                            </select>
                        </div>
                    </div>
                    <CountryCardList countries={countries}/>
                </div>
            </main>
        </>
    );
};

export default ExploreCountries;
