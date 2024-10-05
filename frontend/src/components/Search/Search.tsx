import styles from "./Search.module.css";
import {GoSearch} from "react-icons/go";
import { filterAtom } from "../../atoms/FilterAtom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { FilterType } from "../../types/FilterType";
import { setFilters, getFilters} from "../../utils/FilterStorage";
import { useDebounce } from 'use-debounce';

const Search = () => {
    const [search, setSearch] = useRecoilState<FilterType>(filterAtom);
    const [input, setInput] = useState<string>(getFilters().search);
    const [debouncedSearch] = useDebounce(input, 1000);

    const handleSearch = () => {
        setSearch((prevState) => ({
            ...prevState,
            search: input,
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    useEffect(() => {
        handleSearch();
        setFilters(search);
    }, [debouncedSearch]);

    return (
        <main className={styles.searchcontainer}>
            <input type="text" placeholder="Search after countries..." className={styles.input} aria-label="Search countries" onChange={handleInputChange} value={input}/>
            <GoSearch className={styles.searchicon} onClick={handleSearch} role="button" aria-label="Click to search" tabIndex={0}/>
        </main>
    );
};

export default Search;