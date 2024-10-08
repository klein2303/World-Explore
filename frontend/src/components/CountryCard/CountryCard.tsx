import {useEffect, useState} from "react";
import styles from "./CountryCard.module.css";
import {LuMapPin} from "react-icons/lu";
import {Link} from "react-router-dom";

interface CountryCardProps {
    name: string;
    image: string;
}

const CountryCard = ({name, image}: CountryCardProps) => {
    const [isFilled, setIsFilled] = useState<boolean>(false);

    const fillMapPin = () => {
        setIsFilled(!isFilled);

        if (isFilled) {
            localStorage.removeItem(name);
        } else {
            localStorage.setItem(name, "filled");
        }
    };

    useEffect(() => {
        const filled = localStorage.getItem(name);
        if (filled) {
            setIsFilled(true);
        }
    }, [name]);

    return (
        <main className={styles.cardcontainer} role="region" aria-labelledby={`country-name-${name}`}>
            <Link to={`/${name.toLowerCase()}`}>
                <img src={image} alt={`image of the country ${name}`} className={styles.cardimage} aria-hidden="true" />
            </Link>
            <div className={styles.information}>
                <p id={`country-name-${name}`} className={styles.name}>
                    {name}
                </p>
                {/* Conditionally render the map pin icon based on whether it's filled */}
                {isFilled ? (
                    <LuMapPin
                        onClick={fillMapPin}
                        className={styles.filled}
                        role="button"
                        aria-pressed={isFilled}
                        aria-label={`Unmark ${name} from visited`}
                    />
                ) : (
                    <LuMapPin
                        onClick={fillMapPin}
                        className={styles.icon}
                        role="button"
                        aria-pressed={isFilled}
                        aria-label={`Mark ${name} as visited`}
                    />
                )}
            </div>
        </main>
    );
};

export default CountryCard;
