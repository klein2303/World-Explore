import styles from './CountryCard.module.css'
import {LuMapPin} from "react-icons/lu";

interface CountryCardProps {
    name: string;
    image: string;
}

const CountryCard = ({name, image}: CountryCardProps) =>  {
    return (
        <div className={styles.cardcontainer}>
            <img src={image} alt={`image of the country ${name}`} className={styles.cardimage} />
            <div className={styles.information}>
                <p>{name}</p>
                <LuMapPin />
            </div>
        </div>
    );
};

export default CountryCard;