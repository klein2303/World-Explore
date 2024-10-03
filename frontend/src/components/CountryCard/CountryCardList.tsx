import styles from './CountryCardList.module.css'
import CountryCard from './CountryCard'
import Countrys from '../../data/Countrys';
import { CountryType } from '../../types/CountryTypes';

const CountryCardList = () => {
    return (
        <div className={styles.cardlist}>
            {Countrys.map((country: CountryType) => (
                <CountryCard name={country.name} image={country.image} />
            ))}
        </div>
    );
}

export default CountryCardList;
