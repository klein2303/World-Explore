import styles from "./CountryCardList.module.css";
import CountryCard from "./CountryCard";
import {CountryType} from "../../types/CountryTypes";

interface CountryCardListProps {
    countries: CountryType[];
}

const CountryCardList = ({countries}: CountryCardListProps) => {
    return (
        <main className={styles.cardlist} role="list">
            {countries.map((country: CountryType) => (
                <div role="listitem" key={country.name} className={styles.listitem}>
                    <CountryCard name={country.name} image={country.image} />
                </div>
            ))}
        </main>
    );
};

export default CountryCardList;
