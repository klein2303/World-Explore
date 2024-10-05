import styles from "./Search.module.css";
import {GoSearch} from "react-icons/go";

const Search = () => {

    const handleSearch = () => {
        console.log("Search clicked");
    };

    return (
        <main className={styles.searchcontainer}>
            <input type="text" placeholder="Search after countries..." className={styles.input} aria-label="Search countries"/>
            <GoSearch className={styles.searchicon} onClick={handleSearch} role="button" aria-label="Click to search" tabIndex={0}/>
        </main>
    );
};

export default Search;