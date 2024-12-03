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
import { JournalTypeWrite } from "../types/JournalType"; // Import JournalType for the journal data
import { FaPenNib } from "react-icons/fa"; // Icon for the button
import JournalEntryModal from "../components/JournalEntryModal/JournalEntryModal";

const Country = () => {
    const { name } = useParams<{ name: string }>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state

    const COUNTRY_AND_JOURNAL_QUERY = gql`
        query GetCountryAndReviews($name: String!) {
            country(name: $name) {
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
            filteredpublicreviews(country: $name) {
                id
                title
                date
                rating
                text
                ispublic
                journal {
                    profile {
                        username
                    }
                }
            }
        }
    `;

    const { data, loading, error } = useQuery(COUNTRY_AND_JOURNAL_QUERY, {
        variables: { name },
        fetchPolicy: "cache-and-network",
    });

    // Function to handle modal open/close
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Function to handle journal entry submission
    const handleJournalSubmit = (entry: JournalTypeWrite) => {
        console.log("New journal entry submitted:", entry);
        closeModal(); // Close the modal
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { country, filteredpublicreviews } = data;

    return (
        <>
            <Navbar />
            {country ? (
                <main role="main">
                    <section className={styles.pagecontainer} aria-label="Information about country">
                        <article className={styles.container}>
                            <Link to={"/ExploreCountries"} className={styles.return}>
                                <PiArrowElbowDownLeft className={styles.returnicon} aria-hidden="true" />
                                <p className={styles.returntext}>Return to Explore</p>
                            </Link>
                            <h1 className={styles.countryname}>{country.name}</h1>
                            <p className={styles.countrycontinent}>Continent: {country.continent}</p>

                            <section className={styles.funfacts} aria-label="Country quick facts">
                                <div className={styles.funfactbox} role="group">
                                    <section className={styles.funfact} role="region" aria-label="Capital information">
                                        <LuMapPin className={styles.icon} aria-hidden="true" />
                                        <p className={styles.funfacttext}>
                                            Capital: {country.capital === null ? "Unavailable" : country.capital}
                                        </p>
                                    </section>
                                    <section className={styles.funfact} role="region" aria-label="Language information">
                                        <GrLanguage className={styles.icon} aria-hidden="true" />
                                        <p className={styles.funfacttext}>
                                            Language: {country.language === null ? "Unavailable" : country.language}
                                        </p>
                                    </section>
                                    <section className={styles.funfact} role="region" aria-label="Currency information">
                                        <TbMoneybag className={styles.icon} aria-hidden="true" />
                                        <p className={styles.funfacttext}>
                                            Currency: {country.currency === null ? "Unavailable" : country.currency}
                                        </p>
                                    </section>
                                    <section
                                        className={styles.funfact}
                                        role="region"
                                        aria-label="Forest area information">
                                        <PiPlant className={styles.icon} aria-hidden="true" />
                                        <p className={styles.funfacttext}>
                                            Forest Area:{" "}
                                            {country.forestarea === null ? "Unavailable" : country.forestarea}
                                        </p>
                                    </section>
                                </div>
                                <img
                                    src={data.country.image}
                                    alt={`Image of ${country.name}`}
                                    className={styles.countryimage}
                                    aria-label={`Image of ${country.name}`}
                                />
                            </section>

                            <aside
                                className={styles.infobox}
                                role="complementary"
                                aria-label="Additional country information">
                                <section className={styles.info} role="region">
                                    <h2 id="about-country-title" className={styles.infotitle}>
                                        About the Country
                                    </h2>
                                    <p className={styles.infotext}>
                                        The name of the country is {country.name}, and it's in the continent{" "}
                                        {country.continent || <em>unavailable</em>}. The language spoken in the country
                                        is {country.language || <em>unavailable</em>}, and the currency used is{" "}
                                        {country.currency || <em>unavailable</em>}. The capital of the country is{" "}
                                        {country.capital || <em>unavailable</em>}, and the largest city is{" "}
                                        {country.largestcity || <em>unavailable</em>}. The population is{" "}
                                        {data.country.population ? (
                                            `${data.country.population} people`
                                        ) : (
                                            <em>not available for this country</em>
                                        )}
                                        , and the land area is{" "}
                                        {country.landarea ? (
                                            `${country.landarea} km²`
                                        ) : (
                                            <em>unknown for this country</em>
                                        )}
                                        . The agriculture area is{" "}
                                        {country.agriculturearea ? (
                                            `${country.agriculturearea} of the landarea`
                                        ) : (
                                            <em>unknown for this country</em>
                                        )}{" "}
                                        and the forest area is{" "}
                                        {country.forestarea ? (
                                            `${country.forestarea} of the landarea`
                                        ) : (
                                            <em>unknown for this country</em>
                                        )}
                                        . The CO2 emission produced by the country is{" "}
                                        {country.co2emission ? (
                                            `${country.co2emission} tons`
                                        ) : (
                                            <em>unknown for this country</em>
                                        )}
                                        .
                                    </p>
                                </section>
                            </aside>
                        </article>
                    </section>
                    {/* Seperate journal section */}
                    <section className={styles.journalSection} aria-labelledby="journal-entries">
                        <div className={styles.journalHeader}>
                            {/* Button to open the journal entry modal */}
                            <h3 id="journal-entries" className={styles.journalTitle}>
                                Public Journal Entries for {country.name}
                            </h3>
                            <button className={styles.addEntryButton} onClick={openModal}>
                                Write a journal entry <FaPenNib className={styles.penIcon} />
                            </button>
                        </div>

                        {/* Horizontal line */}
                        <hr className={styles.horizontalLine} />

                        {/* Render message if there are no journal entries */}
                        {filteredpublicreviews.length === 0 ? (
                            <p className={styles.noEntriesMessage}>No public journal entries for this country yet.</p>
                        ) : (
                            <div className={styles.entriesGrid}>
                                <PublicJournalEntryList
                                    journal={{ country: country.name, reviews: filteredpublicreviews }}
                                />
                            </div>
                        )}
                        {/* Modal for writing a journal entry */}
                        <JournalEntryModal
                            country={country.name}
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onSubmit={handleJournalSubmit}
                        />
                    </section>
                </main>
            ) : (
                <main className={styles.noCountry} role="main" aria-describedby="not-found">
                    <h1 id="not-found" aria-label="Error 404: Page not found">
                        404
                    </h1>
                </main>
            )}
        </>
    );
};

export default Country;
