import styles from "./PopularCountries.module.css";

const PopularCountries = () => {
    return (
        <section className={styles.popularCountriesSection} aria-label="Buttons with 10 most popular countries">
            <p className={styles.popularTitle} aria-label="Title">
                Popular countries
            </p>
            <section className={styles.labelContainer} aria-label="Labels for each country">
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
                    <label key={index} className={styles.countryLabel} aria-label="label for country">
                        {country}
                    </label>
                ))}
            </section>
        </section>
    );
};

export default PopularCountries;
