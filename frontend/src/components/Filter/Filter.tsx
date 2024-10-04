import { useEffect, useState } from 'react';
import styles from './Filter.module.css';

const Filter = () => {
    const initialStates = {
        Africa: false,
        Asia: false,
        Europe: false,
        "North America": false,
        Oceania: false,
        "South America": false,
    }
    
    const [isClicked, setIsClicked] = useState<{[key:string]:boolean}>(initialStates);

    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, checked} = e.target;
        setIsClicked((prevState) => ({
            ...prevState,
            [id]: checked,
        }));

        sessionStorage.setItem(id, JSON.stringify(checked));
    }

    useEffect(() => {
        const savedStates: {[key: string]: boolean} = {...initialStates};

        for (const key in initialStates) {
            const savedState = sessionStorage.getItem(key);
            if (savedState) {
                savedStates[key] = JSON.parse(savedState);
            }
        }

        setIsClicked(savedStates);
    }, []);

    return (
        <main className={styles.filtercontainer} aria-label="Filter Section">
            <div className={styles.informationbox} role="region" aria-labelledby="filters-title">
                <p id="filters-title" className={styles.title}>Filters</p>
                <p id="continents-description" className={styles.decription}>Continents</p>
                <div className={styles.filterlist} role="group" aria-labelledby="continent-filter">
                    <div className={styles.filteritem}>
                        <input type="checkbox" id="Africa" name="Africa" value="Africa" onChange={handleClick} checked={isClicked['Africa']} className={styles.checkbox} aria-labelledby="label-africa"/>
                        <label htmlFor="Africa" id="label-africa" className={styles.customCheckbox}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            Africa
                        </label>
                    </div>
                    <div className={styles.filteritem}>
                        <input type="checkbox" id="Asia" name="Asia" value="Asia" onChange={handleClick} checked={isClicked['Asia']} className={styles.checkbox} aria-labelledby="label-asia"/>
                        <label htmlFor="Asia" id="label-asia"className={styles.customCheckbox}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            Asia
                        </label>
                    </div>
                    <div className={styles.filteritem}>
                        <input type="checkbox" id="Europe" name="Europe" value="Europe" onChange={handleClick} checked={isClicked['Europe']} className={styles.checkbox} aria-labelledby="label-europe"/>
                        <label htmlFor="Europe"id="label-europe" className={styles.customCheckbox}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            Europe
                        </label>
                    </div>
                    <div className={styles.filteritem}>
                        <input type="checkbox" id="North America" name="North America" value="North America" onChange={handleClick} checked={isClicked['North America']} className={styles.checkbox} aria-labelledby="label-north-america"/>
                        <label htmlFor="North America" id="label-north-america" className={styles.customCheckbox}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            North America
                        </label>
                    </div>
                    <div className={styles.filteritem}>
                        <input type="checkbox" id="Oceania" name="Oceania" value="Oceania" onChange={handleClick} checked={isClicked['Oceania']} className={styles.checkbox} aria-labelledby="label-oceania"/>
                        <label htmlFor="Oceania" id="label-oceania" className={styles.customCheckbox}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            Oceania
                        </label>
                    </div>
                    <div className={styles.filteritem}>
                        <input type="checkbox" id="South America" name="South America" value="South America" onChange={handleClick} checked={isClicked['South America']} className={styles.checkbox} aria-labelledby="label-south-america"/>
                        <label htmlFor="South America" id="label-south-america" className={styles.customCheckbox}>
                            <span className={styles.checkboxVisual} role="presentation"></span>
                            South America
                        </label>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Filter;