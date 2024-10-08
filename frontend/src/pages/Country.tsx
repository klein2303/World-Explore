import styles from "../styles/Country.module.css";
import { PiArrowElbowDownLeft } from "react-icons/pi";
import Navbar from "../components/Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { LuMapPin } from "react-icons/lu";
import { GrLanguage } from "react-icons/gr";
import { TbMoneybag } from "react-icons/tb";
import { PiPlant } from "react-icons/pi";
import { CountryType } from "../types/CountryTypes";
import { useEffect, useState } from "react";
import Countries from "../data/Countries";

const Country = () => {
    const { name } = useParams<{ name: string }>();
    const [country, setCountry] = useState<CountryType | null>(null);

    useEffect(() => {
        const country = Countries.find((country) => country.name.toLowerCase() === (name?.toLowerCase() ?? ""));
        setCountry(country ?? null);
    }, [name]);

    if (!country) return <p>Loading...</p>;

    return (
        <>
            <Navbar />
            <main className={styles.maincontainer} role="main">
                <article className={styles.container}>
                    <Link to={"/ExploreCountries"} className={styles.return} aria-label="Return to explore countries">
                        <PiArrowElbowDownLeft className={styles.returnicon} aria-hidden="true" />
                        <p className={styles.returntext}>Return to Explore</p>
                    </Link>
                    <h1 className={styles.countryname}>{country.name}</h1>
                    <p className={styles.countrycontinent}>Continent: {country.continent}</p>
                    
                    <section className={styles.funfacts} aria-label="Country fun facts">
                        <div className={styles.funfactbox}>
                            <section className={styles.funfact} role="region" aria-label="Capital information">
                                <LuMapPin className={styles.icon} aria-hidden="true" />
                                <p className={styles.funfacttext}>Capital: {country.capital}</p>
                            </section>
                            <section className={styles.funfact} role="region" aria-label="Language information">
                                <GrLanguage className={styles.icon} aria-hidden="true" />
                                <p className={styles.funfacttext}>Language: {country.language}</p>
                            </section>
                            <section className={styles.funfact} role="region" aria-label="Currency information">
                                <TbMoneybag className={styles.icon} aria-hidden="true" />
                                <p className={styles.funfacttext}>Currency: {country.currency}</p>
                            </section>
                            <section className={styles.funfact} role="region" aria-label="Forest area information">
                                <PiPlant className={styles.icon} aria-hidden="true" />
                                <p className={styles.funfacttext}>Forest Area: {country.forest_area}</p>
                            </section>
                        </div>
                        <img 
                            src={country.image} 
                            alt={`Image of ${country.name}`} 
                            className={styles.countryimage} 
                            aria-label={`Image of ${country.name}`} 
                        />
                    </section>

                    <aside className={styles.infobox} role="complementary" aria-label="Additional country information">
                        <section className={styles.info} role="region" aria-labelledby="about-country-title">
                            <h2 id="about-country-title" className={styles.infotitle}>About the Country</h2>
                            <p className={styles.infotext}>
                                The name of the country is {country.name}, and it's in the continent {country.continent}. The language spoken in the country is {country.language}, 
                                and the currency used is {country.currency}. The capital of the country is {country.capital}, and the largest city is {country.largest_city}. 
                                It has a population of {country.population} people, and a land area of {country.land_area} km². The land area contains {country.agriculture_area} 
                                agriculture and {country.forest_area} forest. The CO2 emission produced by the country is {country.co2_emissions} tons.
                            </p>
                        </section>
                    </aside>
                </article>
            </main>
        </>
    );
};

export default Country;
