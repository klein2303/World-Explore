import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { LuMapPin } from "react-icons/lu";
import { LiaGlobeSolid } from "react-icons/lia";
import { useTheme } from "../../context/ThemeContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeLink, setActiveLink] = useState<string>("/");
    const { theme, toggleTheme } = useTheme();

    const token = sessionStorage.getItem("auth-token");
    const location = useLocation(); // Get the current location

    // Effect to set active link based on the current path
    useEffect(() => {
        setActiveLink(location.pathname); // Update active link on location change
    }, [location]);

    const handleSignOut = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("user");
    };

    const handleLinkClick = (link: string) => {
        setActiveLink(link); // Immediately set the clicked link as active
        setIsOpen(false); // Close the mobile menu if it's open
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 800px)");

        const handleMediaQueryChange = (e: MediaQueryListEvent) => {
            if (!e.matches && isOpen) {
                setIsOpen(false);
            }
        };

        mediaQuery.addEventListener("change", handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, [isOpen]);

    return (
        <>
            {token ? (
                <main>
                    {/* Main navigation section of the page */}
                    <nav
                        className={`${styles.navbar} ${theme === "dark" ? styles.dark : styles.light}`}
                        role="navigation"
                        aria-label="Main Navigation">
                        {isOpen && (
                            <div className={styles.mobilemenu} role="dialog" aria-label="Mobile Navigation Menu">
                                {/* Close button for mobile menu */}
                                <div className={styles.crosspos} role="presentation">
                                    <RxCross1
                                        className={styles.cross}
                                        onClick={() => setIsOpen(false)}
                                        aria-description="Close Mobile Menu"
                                    />
                                </div>

                                <Link
                                    to="/"
                                    className={`${styles.navlink} ${activeLink === "/" ? styles.active : ""}`}
                                    onClick={() => handleLinkClick("/")}
                                    aria-labelledby="Home">
                                    <p>Home</p>
                                </Link>
                                <Link
                                    to="/ExploreCountries"
                                    className={`${styles.navlink} ${activeLink === "/ExploreCountries" ? styles.active : ""}`}
                                    onClick={() => handleLinkClick("/ExploreCountries")}
                                    aria-labelledby="journals">
                                    <p id="journals">Explore Countries</p>
                                </Link>
                                <Link
                                    to="/MyJournals"
                                    className={`${styles.navlink} ${activeLink === "/MyJournals" ? styles.active : ""}`}
                                    onClick={() => handleLinkClick("/MyJournals")}
                                    aria-label="My Journals">
                                    <p>My Journals</p>
                                </Link>

                                <DarkModeSwitch
                                    style={{ marginLeft: "10px" }}
                                    checked={theme === "dark"}
                                    onChange={toggleTheme}
                                    size={25}
                                    sunColor="#424242"
                                    moonColor="white"
                                    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                                />

                                <Link to={"/Home"} className={styles.signOut} onClick={handleSignOut}>
                                    <p>Sign Out</p>
                                </Link>
                            </div>
                        )}

                        {/* Button to open mobile menu */}
                        <RxHamburgerMenu
                            className={styles.hamburgmenu}
                            onClick={() => setIsOpen(true)}
                            aria-description="Open Mobile Menu"
                        />

                        <Link to={"/"} className={styles.navTitle}>
                            <p>WorldExplore</p>
                        </Link>

                        <div className={styles.navlinks} role="group" aria-label="Navigation Links">
                            <Link to={"/ExploreCountries"} className={styles.navlink}>
                                <LiaGlobeSolid className={styles.search} aria-hidden="true" />
                                <p>Explore Countries</p>
                            </Link>
                            <Link to={"/MyJournals"} className={styles.navlink}>
                                <LuMapPin className={styles.pin} aria-hidden="true" />
                                <p>My Journals</p>
                            </Link>
                            <Link to={"/"} className={styles.navlink} onClick={handleSignOut} aria-label="Sign out">
                                <CgProfile className={styles.profile} aria-hidden="true" />
                                <p>Sign Out</p>
                            </Link>
                            <DarkModeSwitch
                                style={{ marginLeft: "10px" }}
                                checked={theme === "dark"}
                                onChange={toggleTheme}
                                size={25}
                                sunColor="#424242"
                                moonColor="white"
                                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                            />
                        </div>
                    </nav>
                </main>
            ) : (
                <main>
                    <nav className={styles.notLoggedNavbar} role="navigation" aria-label="Main Navigation">
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
                                <DarkModeSwitch
                                    style={{ marginLeft: "10px", marginTop: "10px" }}
                                    checked={theme === "dark"}
                                    onChange={toggleTheme}
                                    size={25}
                                    sunColor="#424242"
                                    moonColor="white"
                                    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                                />
                                <Link
                                    to={"/LogIn"}
                                    className={styles.login}
                                    onClick={handleSignOut}
                                    aria-label="Log in">
                                    <p>Log in</p>
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
                            <Link to={"/Login"} className={styles.navlink}>
                                <CgProfile className={styles.profile} aria-label="Open Profile Menu" />
                                <p>Log in</p>
                            </Link>
                            <DarkModeSwitch
                                style={{ marginLeft: "10px" }}
                                checked={theme === "dark"}
                                onChange={toggleTheme}
                                size={25}
                                sunColor="#424242"
                                moonColor="white"
                                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                            />
                        </div>
                    </nav>
                </main>
            )}
        </>
    );
};

export default Navbar;
