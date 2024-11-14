import { Link, useLocation} from "react-router-dom";
import styles from "./Navbar.module.css";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { GoSearch } from "react-icons/go";
import { LuMapPin } from "react-icons/lu";
import { LiaGlobeSolid } from "react-icons/lia";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    const [activeLink, setActiveLink] = useState<string>("/");
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

                                <Link 
                                    to="/" 
                                    className={`${styles.navlink} ${activeLink === '/' ? styles.active : ''}`} 
                                    onClick={() => handleLinkClick('/')} 
                                    aria-label="Home">
                                    <p>Home</p>
                                </Link>
                                <Link 
                            to="/ExploreCountries" 
                            className={`${styles.navlink} ${activeLink === '/ExploreCountries' ? styles.active : ''}`}  
                            onClick={() => handleLinkClick('/ExploreCountries')} 
                            aria-label="Explore Countries">
                            <p>Explore Countries</p>
                        </Link>
                        <Link 
                            to="/MyJournals" 
                            className={`${styles.navlink} ${activeLink === '/MyJournals' ? styles.active : ''}`} 
                            onClick={() => handleLinkClick('/MyJournals')} 
                            aria-label="My Journals">
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
                                <LiaGlobeSolid className={styles.search} aria-hidden="true" />
                                <p>Explore Countries</p>
                            </Link>
                            <Link to={"/MyJournals"} className={styles.navlink}>
                                <LuMapPin className={styles.pin} aria-hidden="true" />
                                <p>My Journals</p>
                            </Link>
                            <Link to={"/Login"} className={styles.navlink}>
                                <CgProfile
                                    className={styles.profile}
                                    onClick={() => setIsProfileOpen(true)}
                                    aria-label="Open Profile Menu"
                                />
                                <p>Sign Out</p>
                            </Link>
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
