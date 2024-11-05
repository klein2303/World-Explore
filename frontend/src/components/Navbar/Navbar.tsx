import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { GoSearch } from "react-icons/go";
import { LuMapPin } from "react-icons/lu";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

    const token = sessionStorage.getItem("auth-token");

    const handleSignOut = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("user");
    };

    return (
        <>
            {token ? (
                <main>
                    {/* Main navigation section of the page */}
                    <nav className={styles.navbar} role="navigation" aria-label="Main Navigation">
                        {isOpen && (
                            <div className={styles.mobilemenu} role="dialog" aria-label="Mobile Navigation Menu">
                                {/* Close button for mobile menu */}
                                <div className={styles.crosspos} role="presentation">
                                    <RxCross1
                                        className={styles.cross}
                                        onClick={() => setIsOpen(false)}
                                        aria-label="Close Mobile Menu"
                                    />
                                </div>

                                <Link to={"/"} className={styles.navlink} aria-label="Home">
                                    <p>Home</p>
                                </Link>
                                <Link
                                    to={"/ExploreCountries"}
                                    className={styles.navlink}
                                    aria-label="Explore Countries">
                                    <p>Explore Countries</p>
                                </Link>
                                <Link to={"/MyJournals"} className={styles.navlink} aria-label="My Journals">
                                    <p>My Journals</p>
                                </Link>

                                <Link to={"/"} className={styles.signOut} onClick={handleSignOut} aria-label="Sign out">
                                    <p>Sign Out</p>
                                </Link>
                            </div>
                        )}

                        {/* Button to open mobile menu */}
                        <RxHamburgerMenu
                            className={styles.hamburgmenu}
                            onClick={() => setIsOpen(true)}
                            aria-label="Open Mobile Menu"
                        />

                        <Link to={"/"} className={styles.navTitle}>
                            <p>WorldExplore</p>
                        </Link>

                        <div className={styles.navlinks} role="group" aria-label="Navigation Links">
                            <Link to={"/ExploreCountries"} className={styles.navlink}>
                                <GoSearch className={styles.search} aria-hidden="true" />
                                <p>Explore Countries</p>
                            </Link>
                            <Link to={"/MyJournals"} className={styles.navlink}>
                                <LuMapPin className={styles.pin} aria-hidden="true" />
                                <p>My Journals</p>
                            </Link>

                            {/* Profile button to open profile menu */}
                            <CgProfile
                                className={styles.profile}
                                onClick={() => setIsProfileOpen(true)}
                                aria-label="Open Profile Menu"
                            />

                            {/* Profile menu when open */}
                            {isProfileOpen && (
                                <div
                                    className={styles.profilemenu}
                                    role="dialog"
                                    aria-modal="true"
                                    aria-label="Profile Menu">
                                    {/* Close button for profile menu */}
                                    <div className={styles.crosspos} role="presentation">
                                        <CgProfile
                                            className={styles.profile}
                                            onClick={() => setIsProfileOpen(false)}
                                            aria-label="Close Profile Menu"
                                        />
                                    </div>

                                    <Link
                                        to={"/"}
                                        className={styles.signOut}
                                        onClick={handleSignOut}
                                        aria-label="Sign out">
                                        <p>Sign out</p>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </main>
            ) : (
                <main>
                    <nav className={styles.notLoggedNavbar} role="navigation" aria-label="Main Navigation">
                        <Link to={"/Login"} className={styles.login}>
                            <p>Log in</p>
                        </Link>
                    </nav>
                </main>
            )}
        </>
    );
};

export default Navbar;
