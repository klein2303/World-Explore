import styles from "./CountryCard.module.css";
import { SlPencil } from "react-icons/sl";
import { Link } from "react-router-dom";

interface CountryCardProps {
    name: string;
    image: string;
}

const CountryCard = ({ name, image }: CountryCardProps) => {
    return (
        <main className={styles.cardcontainer} role="region" aria-labelledby={`country-name-${name}`}>
            <Link to={`/${name}`}>
                <img src={image} alt={`image of the country ${name}`} className={styles.cardimage} aria-hidden="true" />
            </Link>
            <div className={styles.information} role="group" aria-label={`Information and actions for ${name}`}>
                <p id={`country-name-${name}`} className={styles.name}>
                    {name}
                </p>
                <SlPencil 
                    className={styles.icon}
                    role="button"
                    aria-label={`Write review from ${name}`}/>
            </div>
        </main>
    );
};

export default CountryCard;
