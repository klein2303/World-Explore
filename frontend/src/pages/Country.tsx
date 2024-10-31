import styles from "../styles/Country.module.css";
import { PiArrowElbowDownLeft } from "react-icons/pi";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LuMapPin } from "react-icons/lu";
import { GrLanguage } from "react-icons/gr";
import { TbMoneybag } from "react-icons/tb";
import { PiPlant } from "react-icons/pi";
import { gql, useQuery } from "@apollo/client";
import PublicJournalEntryList from "../components/PublicJournalEntry/PublicJournalEntryList";
import { JournalType } from "../types/JournalType"; // Import JournalType for the journal data
import { FaPenNib } from "react-icons/fa"; // Icon for the button
import JournalEntryModal from "../components/JournalEntryModal/JournalEntryModal";

const Country = () => {
    const { name } = useParams<{name: string}>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state

    const COUNTRY_AND_JOURNAL_QUERY = gql`
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
                co2emission
                image
            }
            filteredpublicreviews(country: "${name}") {
                title
                date
                rating
                text
                ispublic
            }
        }
    `;

    const { data, loading, error } = useQuery(COUNTRY_AND_JOURNAL_QUERY, {
        variables: { name },
        fetchPolicy: "cache-first", // Used for first execution
        nextFetchPolicy: "cache-first", // Used for subsequent executions
    });

    // Function to handle modal open/close
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Function to handle journal entry submission
    const handleJournalSubmit = (entry: JournalType) => {
        console.log("New journal entry submitted:", entry);
        // Handle saving the journal entry here
        closeModal(); // Close the modal
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { country, filteredpublicreviews } = data;

    return (
        <>
            <Navbar />
            <main role="main">
                <section className={styles.pagecontainer}>
                    <article className={styles.container}>
                        <Link to={"/ExploreCountries"} className={styles.return} aria-label="Return to explore countries">
                            <PiArrowElbowDownLeft className={styles.returnicon} aria-hidden="true" />
                            <p className={styles.returntext}>Return to Explore</p>
                        </Link>
                        <h1 className={styles.countryname}>{country.name}</h1>
                        <p className={styles.countrycontinent}>Continent: {country.continent}</p>

                        <section className={styles.funfacts} aria-label="Country fun facts">
                            <div className={styles.funfactbox} role="group" aria-label="Country fun facts information">
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
                                    <p className={styles.funfacttext}>Forest Area: {country.forestarea}</p>
                                </section>
                            </div>
                            <img
                                src={data.country.image}
                                alt={`Image of ${country.name}`}
                                className={styles.countryimage}
                                aria-label={`Image of ${country.name}`}
                            />
                        </section>

                        <aside className={styles.infobox} role="complementary" aria-label="Additional country information">
                            <section className={styles.info} role="region" aria-labelledby="about-country-title">
                                <h2 id="about-country-title" className={styles.infotitle}>
                                    About the Country
                                </h2>
                                <p className={styles.infotext}>
                                    The name of the country is {country.name}, and it's in the continent{" "}
                                    {country.continent}. The language spoken in the country is {country.language},
                                    and the currency used is {country.currency}. The capital of the country is{" "}
                                    {country.capital}, and the largest city is {country.largestcity}. It has a
                                    population of {data.country.population} people, and a land area of{" "}
                                    {country.landarea} km². The land area contains {country.agriculturearea}{" "}
                                    agriculture and {country.forestarea} forest. The CO2 emission produced by the
                                    country is {country.co2emission} tons.
                                </p>
                            </section>
                        </aside>
                    </article>
                </section>
                {/* Seperate journal section */}
                <section className={styles.journalSection}>
                    <div className={styles.journalHeader}>
                        {/* Button to open the journal entry modal */}
                        <h3 className={styles.journalTitle}>Public Journal Entries for {country.name}</h3><p className={styles.noEntriesMessage}></p>
                        <button className={styles.addEntryButton} onClick={openModal}>
                                Write a journal entry <FaPenNib className={styles.penIcon} />
                        </button>
                    </div>
                    {/* Horizontal line */}
                    <div className={styles.horizontalLine}></div>

                    {/* Render message if there are no journal entries */}
                    {filteredpublicreviews.length === 0 ? (
                        <p>No public journal entries for this country yet.</p>
                    ) : (
                    <div className={styles.entriesGrid}>
                        <PublicJournalEntryList journal={{ country: country.name, reviews: filteredpublicreviews }} />
                    </div>)}
                    {/* Modal for writing a journal entry */}
                    <JournalEntryModal
                            country={country.name}
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onSubmit={handleJournalSubmit}
                        />
                </section>
            </main>
        </>
    );
};

export default Country;
