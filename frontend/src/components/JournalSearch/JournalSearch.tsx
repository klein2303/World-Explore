import styles from "./JournalSearch.module.css";
import { GoSearch } from "react-icons/go";
import { journalSearchAtom } from "../../atoms/JournalSearchAtom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { JournalSearchType } from "../../types/FilterType";

const JournalSearch = () => {
    const [search, setSearch] = useRecoilState<JournalSearchType>(journalSearchAtom);
    const [input, setInput] = useState<string>(search.search);
    const [debouncedSearch] = useDebounce(input, 1000);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    useEffect(() => {
        if (debouncedSearch === search.search) return;
        setSearch((prevState) => ({
            ...prevState,
            search: debouncedSearch,
        }));
    }, [debouncedSearch, setSearch, search]);

    return (
        <main className={styles.searchcontainer}>
            <input
                type="text"
                placeholder="Search after journals..."
                className={styles.input}
                aria-label="Search journals"
                onChange={handleInputChange}
                value={input}
            />
            <GoSearch className={styles.searchicon} role="button" aria-description="Click to search" tabIndex={0} />
        </main>
    );
};

export default JournalSearch;
