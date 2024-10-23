import styles from "../styles/Country.module.css";
import {PiArrowElbowDownLeft} from "react-icons/pi";
import Navbar from "../components/Navbar/Navbar";
import {Link, useParams} from "react-router-dom";
import {LuMapPin} from "react-icons/lu";
import {GrLanguage} from "react-icons/gr";
import {TbMoneybag} from "react-icons/tb";
import {PiPlant} from "react-icons/pi";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const Country = () => {
    const {name} = useParams<{name: string}>();

    const COUNTRY_QUERY = gql`
        {
            country(name: "${name}") {
                name
                continent
                capital
                largestcity
                currency
                language
                population
                landarea
                agriculturearea
                forestarea
                co2emissions
                image
            }
        }
    `;

    const { data, loading, error } = useQuery(COUNTRY_QUERY, {
        fetchPolicy: "cache-first", // Used for first execution
        nextFetchPolicy: "cache-first", // Used for subsequent executions
    });

    useEffect(() => {
        if (data) {
            console.log(data.country.co2_emissions);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <Navbar />
            <main className={styles.maincontainer} role="main">
                <article className={styles.container}>
                    <Link to={"/ExploreCountries"} className={styles.return} aria-label="Return to explore countries">
                        <PiArrowElbowDownLeft className={styles.returnicon} aria-hidden="true" />
                        <p className={styles.returntext}>Return to Explore</p>
                    </Link>
                    <h1 className={styles.countryname}>{data.country.name}</h1>
                    <p className={styles.countrycontinent}>Continent: {data.country.continent}</p>

                    <section className={styles.funfacts} aria-label="Country fun facts">
                        <div className={styles.funfactbox} role="group" aria-label="Country fun facts information">
                            <section className={styles.funfact} role="region" aria-label="Capital information">
                                <LuMapPin className={styles.icon} aria-hidden="true" />
                                <p className={styles.funfacttext}>Capital: {data.country.capital}</p>
                            </section>
                            <section className={styles.funfact} role="region" aria-label="Language information">
                                <GrLanguage className={styles.icon} aria-hidden="true" />
                                <p className={styles.funfacttext}>Language: {data.country.language}</p>
                            </section>
                            <section className={styles.funfact} role="region" aria-label="Currency information">
                                <TbMoneybag className={styles.icon} aria-hidden="true" />
                                <p className={styles.funfacttext}>Currency: {data.country.currency}</p>
                            </section>
                            <section className={styles.funfact} role="region" aria-label="Forest area information">
                                <PiPlant className={styles.icon} aria-hidden="true" />
                                <p className={styles.funfacttext}>Forest Area: {data.country.forestarea}</p>
                            </section>
                        </div>
                        <img
                            src={data.country.image}
                            alt={`Image of ${data.country.name}`}
                            className={styles.countryimage}
                            aria-label={`Image of ${data.country.name}`}
                        />
                    </section>

                    <aside className={styles.infobox} role="complementary" aria-label="Additional country information">
                        <section className={styles.info} role="region" aria-labelledby="about-country-title">
                            <h2 id="about-country-title" className={styles.infotitle}>
                                About the Country
                            </h2>
                            <p className={styles.infotext}>
                                The name of the country is {data.country.name}, and it's in the continent {data.country.continent}
                                . The language spoken in the country is {data.country.language}, and the currency used is{" "}
                                {data.currency}. The capital of the country is {data.country.capital}, and the largest
                                city is {data.country.largestcity}. It has a population of {data.country.population} people, and
                                a land area of {data.country.landarea} km². The land area contains{" "}
                                {data.country.agriculturearea}
                                {" "} agriculture and {data.country.forestarea} forest. The CO2 emission produced by the country
                                is {data.country.co2emissions} tons.
                            </p>
                        </section>
                    </aside>
                </article>
            </main>
        </>
    );
};

export default Country;
