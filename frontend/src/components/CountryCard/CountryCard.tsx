import { useEffect, useState } from 'react';
import styles from './CountryCard.module.css'
import {LuMapPin} from "react-icons/lu";

interface CountryCardProps {
    name: string;
    image: string;
}

const CountryCard = ({name, image}: CountryCardProps) =>  {
    const [isFilled, setIsFilled] = useState<boolean>(false);
    
    const fillMapPin = () => {
        setIsFilled(!isFilled);

        if (isFilled) {
            localStorage.removeItem(name);
        } else {
            localStorage.setItem(name, 'filled');
        }
    }

    useEffect(() => {
        const filled = localStorage.getItem(name);
        if (filled) {
            setIsFilled(true);
        }
    }, [name])

    return (
        <div className={styles.cardcontainer}>
            <img src={image} alt={`image of the country ${name}`} className={styles.cardimage} />
            <div className={styles.information}>
                <p className={styles.name}>{name}</p>
                {isFilled ? <LuMapPin onClick={fillMapPin} className={styles.filled}/> : <LuMapPin onClick={fillMapPin} className={styles.icon}/>}
            </div>
        </div>
    );
};

export default CountryCard;