import { useEffect } from "react";
import styles from "./Filter.module.css";
import { useRecoilState } from "recoil";
import { filterAtom } from "../../atoms/FilterAtom";
import { FilterType } from "../../types/FilterType";
import { setFilters } from "../../utils/FilterStorage";

const Filter = () => {
    const [isClicked, setIsClicked] = useRecoilState<FilterType>(filterAtom);

    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;

        setIsClicked((prevState) => ({
            ...prevState,
            continent: {
                ...prevState.continent,
                [id]: checked,
            },
        }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            const label = e.target as HTMLLabelElement;
            const associatedCheckbox = document.getElementById(label.htmlFor) as HTMLInputElement;

            if (associatedCheckbox) {
                associatedCheckbox.checked = !associatedCheckbox.checked;

                setIsClicked((prevState) => ({
                    ...prevState,
                    continent: {
                        ...prevState.continent,
                        [associatedCheckbox.id]: associatedCheckbox.checked,
                    },
                }));
            }
        }
    };

    useEffect(() => {
        setFilters(isClicked);
    }, [isClicked]);

    return (
        <main className={styles.filtercontainer} aria-description="Filter based on continents">
            <div className={styles.informationbox} role="region" aria-labelledby="filters-title">
                <p id="filters-title" className={styles.title}>
                    Filters
                </p>
                <p id="continents-description" className={styles.decription}>
                    Continents
                </p>
                <div className={styles.filterlist} role="group" aria-label="continents">
                    <section className={styles.filteritem}>
                        <input
                            type="checkbox"
                            id="Africa"
                            name="Africa"
                            value="Africa"
                            onChange={handleClick}
                            onKeyDown={handleKeyDown}
                            checked={isClicked.continent["Africa"]}
                            className={styles.checkbox}
                            aria-label="label-africa"
                            tabIndex={0}
                        />
                        <label
                            htmlFor="Africa"
                            id="label-africa"
                            className={styles.customCheckbox}
                            tabIndex={0}
                            onKeyDown={handleKeyDown}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            Africa
                        </label>
                    </section>
                    <section className={styles.filteritem}>
                        <input
                            type="checkbox"
                            id="Asia"
                            name="Asia"
                            value="Asia"
                            onChange={handleClick}
                            onKeyDown={handleKeyDown}
                            checked={isClicked.continent["Asia"]}
                            className={styles.checkbox}
                            aria-label="label-asia"
                            tabIndex={0}
                        />
                        <label
                            htmlFor="Asia"
                            id="label-asia"
                            className={styles.customCheckbox}
                            tabIndex={0}
                            onKeyDown={handleKeyDown}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            Asia
                        </label>
                    </section>
                    <section className={styles.filteritem}>
                        <input
                            type="checkbox"
                            id="Europe"
                            name="Europe"
                            value="Europe"
                            onChange={handleClick}
                            onKeyDown={handleKeyDown}
                            checked={isClicked.continent["Europe"]}
                            className={styles.checkbox}
                            aria-label="label-europe"
                            tabIndex={0}
                        />
                        <label
                            htmlFor="Europe"
                            id="label-europe"
                            className={styles.customCheckbox}
                            tabIndex={0}
                            onKeyDown={handleKeyDown}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            Europe
                        </label>
                    </section>
                    <section className={styles.filteritem}>
                        <input
                            type="checkbox"
                            id="North America"
                            name="North America"
                            value="North America"
                            onChange={handleClick}
                            onKeyDown={handleKeyDown}
                            checked={isClicked.continent["North America"]}
                            className={styles.checkbox}
                            aria-label="label-north-america"
                            tabIndex={0}
                        />
                        <label
                            htmlFor="North America"
                            id="label-north-america"
                            className={styles.customCheckbox}
                            tabIndex={0}
                            onKeyDown={handleKeyDown}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            North America
                        </label>
                    </section>
                    <section className={styles.filteritem}>
                        <input
                            type="checkbox"
                            id="Oceania"
                            name="Oceania"
                            value="Oceania"
                            onChange={handleClick}
                            onKeyDown={handleKeyDown}
                            checked={isClicked.continent["Oceania"]}
                            className={styles.checkbox}
                            aria-label="label-oceania"
                            tabIndex={0}
                        />
                        <label
                            htmlFor="Oceania"
                            id="label-oceania"
                            className={styles.customCheckbox}
                            tabIndex={0}
                            onKeyDown={handleKeyDown}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            Oceania
                        </label>
                    </section>
                    <section className={styles.filteritem}>
                        <input
                            type="checkbox"
                            id="South America"
                            name="South America"
                            value="South America"
                            onChange={handleClick}
                            onKeyDown={handleKeyDown}
                            checked={isClicked.continent["South America"]}
                            className={styles.checkbox}
                            aria-label="label-south-america"
                            tabIndex={0}
                        />
                        <label
                            htmlFor="South America"
                            id="label-south-america"
                            className={styles.customCheckbox}
                            tabIndex={0}
                            onKeyDown={handleKeyDown}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            South America
                        </label>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default Filter;
