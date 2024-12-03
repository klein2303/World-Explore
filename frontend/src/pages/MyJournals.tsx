import { useState, useEffect, useCallback} from "react";
import Navbar from "../components/Navbar/Navbar";
import JournalCard from "../components/JournalCard/JournalCard";
import styles from "../styles/MyJournals.module.css";
import Pagination from "@mui/material/Pagination";
import { useRecoilState } from "recoil";
import { myJournalPageAtom } from "../atoms/MyJournalPageAtom";
import { gql, useQuery } from "@apollo/client";
import { removeQuotes } from "../utils/utils";
import { useTheme } from "../context/ThemeContext";
import JournalSearch from "../components/JournalSearch/JournalSearch";
import { journalSearchAtom } from "../atoms/JournalSearchAtom";
import { JournalSearchType } from "../types/FilterType";

const MyJournals = () => {
    const { theme } = useTheme();

    const [search] = useRecoilState<JournalSearchType>(journalSearchAtom);

    const ITEMS_PER_PAGE = 15;
    const [currentPage, setCurrentPage] = useRecoilState(myJournalPageAtom);

    const initialSubtitle =
        window.innerWidth <= 768
            ? "Tap the images to dive into your adventures!"
            : "Your travel stories, captured and cherished forever.";
    const [subtitleText, setSubtitleText] = useState<string>(initialSubtitle);

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage({ page: value });
    };

    const profileid = removeQuotes(sessionStorage.getItem("user")!);

    const WRITTEN_JOURNALS = gql`
        query GetWrittenJournals($skip: Int, $profileid: String!, $information: String) {
            writtenjournals(skip: $skip, profileid: $profileid, information: $information) {
                countryid
                countryimage
            }
        }
    `;

    const resetPage = useCallback(() => {
        setCurrentPage({ page: 1 });
    }, [setCurrentPage]);

    useEffect(() => {
        resetPage();
    }, [search.search, resetPage]);

    const { data, loading, error } = useQuery(WRITTEN_JOURNALS, {
        variables: { skip: currentPage.page > 0 ? (currentPage.page - 1) * 12 : 0, profileid: profileid, information: search.search },
        fetchPolicy: "cache-and-network",
    });

    // Keep this effect to update the subtitle based on window width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setSubtitleText("Tap the images to dive into your adventures!");
            } else {
                setSubtitleText("Your travel stories, captured and cherished forever.");
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <Navbar />
            <main className={styles.container}>
                {/* Title and Tabs in the same row */}
                <header className={styles.header}>
                    <h1 className={styles.pageTitle}>{"Captured Adventures"}</h1>
                </header>
                <section className={styles.journalSearch}>
                    <JournalSearch />
                </section>
                {data.writtenjournals.length === 0 ? (                    
                    <>
                        <p className={styles.noResultsMessage}>
                            You haven´t written any journal entries for this search yet. Try another search or explore all the countries in the world in the Explore Countries Page.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className={styles.subtitle}>{subtitleText}</h2>
                        <section id="journals-panel" role="tabpanel" className={styles.grid}>
                            {data.writtenjournals.map((journal: { countryid: string; countryimage: string }) => (
                                <JournalCard
                                    key={journal.countryid}
                                    country={journal.countryid}
                                    image={journal.countryimage}
                                />
                            ))}
                        </section>
                        <Pagination
                            page={currentPage.page}
                            onChange={handleChange}
                            count={Math.ceil(data.writtenjournals.length / ITEMS_PER_PAGE)}
                            className={styles.pagination}
                            sx={
                                theme === "dark"
                                    ? {
                                          ".MuiPaginationItem-root": {
                                              color: "white",
                                          },
                                          ".MuiButtonBase-root:hover, .MuiPaginationItem-root.Mui-selected:hover": {
                                              backgroundColor: "#333",
                                          },
                                          ".MuiPaginationItem-root.Mui-selected": {
                                              backgroundColor: "#666262",
                                          },
                                      }
                                    : {}
                            }
                        />
                    </>
                )}
            </main>
        </>
    );
};

export default MyJournals;
