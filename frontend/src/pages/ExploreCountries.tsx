import Navbar from "../components/Navbar/Navbar";
import CountryCardList from "../components/CountryCard/CountryCardList";
import Countries from "../data/Countries";
import Filter from "../components/Filter/Filter";
import styles from "../styles/ExploreCountries.module.css";
import Search from "../components/Search/Search";
import { useEffect, useState } from "react";
import { filterAtom } from "../atoms/FilterAtom";
import { useRecoilValue } from "recoil";

const ExploreCountries = () => {
    const [countries, setCountries] = useState(Countries);
    const filter = useRecoilValue(filterAtom);
    useEffect(() => {
        // const filters = sessionStorage.getItem("clickedContinents") ? JSON.parse(sessionStorage.getItem("clickedContinents") as string) : [];
        // if (!sessionStorage.getItem("clickedContinents")) {
        //     sessionStorage.setItem("clickedContinents", "[]");
        // }

        if (!Object.values(filter.continent).includes(true)) {
            setCountries(Countries);
            setCountries((prevCountries) => prevCountries.filter((country) => country.name.toLowerCase().includes(filter.search.toLowerCase())));
        }
        else {
            setCountries(Countries.filter((country) => filter.continent[country.continent as keyof typeof filter.continent] === true));
            setCountries((prevCountries) => prevCountries.filter((country) => country.name.toLowerCase().includes(filter.search.toLowerCase())));
        }

    }, [Countries, filter]);

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
