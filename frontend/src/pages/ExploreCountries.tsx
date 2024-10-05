import Navbar from "../components/Navbar/Navbar";
import CountryCardList from "../components/CountryCard/CountryCardList";
import Countrys from "../data/Countrys";
import Filter from "../components/Filter/Filter";
import styles from "../styles/ExploreCountries.module.css";
import Search from "../components/Search/Search";
import { useEffect, useState } from "react";
import { filterAtom } from "../atoms/FilterAtom";
import { useRecoilValue } from "recoil";

const ExploreCountries = () => {
    const [countries, setCountries] = useState(Countrys);
    const filter = useRecoilValue(filterAtom);
    useEffect(() => {
        // const filters = sessionStorage.getItem("clickedContinents") ? JSON.parse(sessionStorage.getItem("clickedContinents") as string) : [];
        // if (!sessionStorage.getItem("clickedContinents")) {
        //     sessionStorage.setItem("clickedContinents", "[]");
        // }

        if (!Object.values(filter.continent).includes(true)) {
            setCountries(Countrys);
            setCountries((prevCountries) => prevCountries.filter((country) => country.name.toLowerCase().includes(filter.search.toLowerCase())));
        }
        else {
            setCountries(Countrys.filter((country) => filter.continent[country.continent as keyof typeof filter.continent] === true));
            setCountries((prevCountries) => prevCountries.filter((country) => country.name.toLowerCase().includes(filter.search.toLowerCase())));
        }

    }, [Countrys, filter]);

    return (
        <>
            <Navbar />
            <main className={styles.maincontainer}>
                <Filter />
                <div>
                    <Search />
                    <CountryCardList countries={countries} />
                </div>
            </main>
        </>
    );
};

export default ExploreCountries;
