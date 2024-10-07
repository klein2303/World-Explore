import styles from "./PopularCountries.module.css";

const PopularCountries = () => {
    return (
        <section className={styles.popularCountriesSection} aria-label="Buttons with 10 most popular countries">
            <p className={styles.popularTitle} aria-label="Title">
                Popular countries
            </p>
            <section className={styles.buttonContainer} aria-label="Buttons for each country">
                {[
                    "Norway",
                    "USA",
                    "Finland",
                    "Madagascar",
                    "Germany",
                    "China",
                    "Sri lanka",
                    "Indonesia",
                    "Japan",
                    "Thailand",
                ].map((country, index) => (
                    <button key={index} className={styles.countryButton}>
                        {country}
                    </button>
                ))}
            </section>
        </section>
    );
};

export default PopularCountries;
