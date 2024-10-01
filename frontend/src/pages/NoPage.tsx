import styles from "../styles/NoPage.module.css";

const NoPage = () => {
    return (
        <main className={styles.page} role="main" aria-label="Page not found">
            <h1 aria-label="Error 404: Page not found">404</h1>
        </main>
    );
};

export default NoPage;
