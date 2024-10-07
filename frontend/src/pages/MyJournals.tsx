import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import JournalCard from '../components/JournalCard/JournalCard';
import styles from '../styles/MyJournals.module.css';
import Countries from '../data/Countries';

const MyJournals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'journals' | 'unwritten'>('journals');

  const journalEntries = Countries.slice(0, 10);
  const visitedCountries = Countries.slice(10);

  const getPageTitle = () => (activeTab === 'journals' ? 'Captured Adventures' : 'Places Yet to Journal');
  const getSubtitle = () => {
    return activeTab === 'journals'
      ? "Your travel stories, captured and cherished forever."
      : "You’ve visited, but the story’s still untold. Ready to write?";
  };

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        {/* Title and Tabs in the same row */}
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>{getPageTitle()}</h1>
          <div className={styles.tabs} role="tablist" aria-label="Journal Tabs">
            <button
              className={`${styles.tabButton} ${activeTab === 'journals' ? styles.active : ''}`}
              onClick={() => setActiveTab('journals')}
              role="tab"
              aria-selected={activeTab === 'journals'}
              aria-controls="journals-panel"
              id="journals-tab"
            >
              Journal Entries
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'unwritten' ? styles.active : ''}`}
              onClick={() => setActiveTab('unwritten')}
              role="tab"
              aria-selected={activeTab === 'unwritten'}
              aria-controls="unwritten-panel"
              id="unwritten-tab"
            >
              Unwritten Adventures
            </button>
          </div>
        </header>

        {/* Catchy subtitle based on active tab */}
        <p className={styles.subtitle}>{getSubtitle()}</p>

        {/* Content based on active tab */}
        <section
          id="journals-panel"
          role="tabpanel"
          aria-labelledby="journals-tab"
          hidden={activeTab !== 'journals'}
          className={styles.grid}
        >
          {activeTab === 'journals' && journalEntries.map((entry) => (
            <JournalCard
              key={entry.name}
              country={entry.name}
              date="2023-01-12"
              image={entry.image}
            />
          ))}
        </section>
        <section
          id="unwritten-panel"
          role="tabpanel"
          aria-labelledby="unwritten-tab"
          hidden={activeTab !== 'unwritten'}
          className={styles.grid}
        >
          {activeTab === 'unwritten' && visitedCountries.map((entry) => (
            <JournalCard
              key={entry.name}
              country={entry.name}
              date={null}  // Pass null if no journal entry
              image={entry.image}
            />
          ))}
        </section>
      </main>
    </>
  );
};

export default MyJournals;