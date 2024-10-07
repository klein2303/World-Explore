import {useEffect} from "react";
import styles from "./Filter.module.css";
import {useRecoilState} from "recoil";
import {filterAtom} from "../../atoms/FilterAtom";
import {FilterType} from "../../types/FilterType";
import {setFilters} from "../../utils/FilterStorage";

const Filter = () => {
    const [isClicked, setIsClicked] = useRecoilState<FilterType>(filterAtom);

    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, checked} = e.target;

        setIsClicked((prevState) => ({
            ...prevState,
            continent: {
                ...prevState.continent,
                [id]: checked,
            },
        }));
    };

    useEffect(() => {
        setFilters(isClicked);
    }, [isClicked]);

    return (
        <main className={styles.filtercontainer} aria-label="Filter based on continents">
            <div className={styles.informationbox} role="region" aria-labelledby="filters-title">
                <p id="filters-title" className={styles.title}>
                    Filters
                </p>
                <p id="continents-description" className={styles.decription}>
                    Continents
                </p>
                <div className={styles.filterlist} role="group" aria-labelledby="continent-filter">
                    <div className={styles.filteritem}>
                        <input
                            type="checkbox"
                            id="Africa"
                            name="Africa"
                            value="Africa"
                            onChange={handleClick}
                            checked={isClicked.continent["Africa"]}
                            className={styles.checkbox}
                            aria-labelledby="label-africa"
                        />
                        <label htmlFor="Africa" id="label-africa" className={styles.customCheckbox}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            Africa
                        </label>
                    </div>
                    <div className={styles.filteritem}>
                        <input
                            type="checkbox"
                            id="Asia"
                            name="Asia"
                            value="Asia"
                            onChange={handleClick}
                            checked={isClicked.continent["Asia"]}
                            className={styles.checkbox}
                            aria-labelledby="label-asia"
                        />
                        <label htmlFor="Asia" id="label-asia" className={styles.customCheckbox}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            Asia
                        </label>
                    </div>
                    <div className={styles.filteritem}>
                        <input
                            type="checkbox"
                            id="Europe"
                            name="Europe"
                            value="Europe"
                            onChange={handleClick}
                            checked={isClicked.continent["Europe"]}
                            className={styles.checkbox}
                            aria-labelledby="label-europe"
                        />
                        <label htmlFor="Europe" id="label-europe" className={styles.customCheckbox}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            Europe
                        </label>
                    </div>
                    <div className={styles.filteritem}>
                        <input
                            type="checkbox"
                            id="North America"
                            name="North America"
                            value="North America"
                            onChange={handleClick}
                            checked={isClicked.continent["North America"]}
                            className={styles.checkbox}
                            aria-labelledby="label-north-america"
                        />
                        <label htmlFor="North America" id="label-north-america" className={styles.customCheckbox}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            North America
                        </label>
                    </div>
                    <div className={styles.filteritem}>
                        <input
                            type="checkbox"
                            id="Oceania"
                            name="Oceania"
                            value="Oceania"
                            onChange={handleClick}
                            checked={isClicked.continent["Oceania"]}
                            className={styles.checkbox}
                            aria-labelledby="label-oceania"
                        />
                        <label htmlFor="Oceania" id="label-oceania" className={styles.customCheckbox}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            Oceania
                        </label>
                    </div>
                    <div className={styles.filteritem}>
                        <input
                            type="checkbox"
                            id="South America"
                            name="South America"
                            value="South America"
                            onChange={handleClick}
                            checked={isClicked.continent["South America"]}
                            className={styles.checkbox}
                            aria-labelledby="label-south-america"
                        />
                        <label htmlFor="South America" id="label-south-america" className={styles.customCheckbox}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            South America
                        </label>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Filter;
