import { useState, useEffect, useRef } from "react";
import styles from "./JournalEntryModal.module.css";
import { FaStar } from "react-icons/fa";

// Husk å fjerne, skal importeres fra JournalType.ts
type ReviewType = {
    id: number;
    title: string;
    dato: string;
    rating: number;
    text: string;
    public: boolean;
}

interface JournalEntryModalProps {
    country: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (entry: {country: string, reviews: ReviewType[]}) => void;
}

const JournalEntryModal = ({ country, isOpen, onClose, onSubmit }: JournalEntryModalProps) => {
    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [text, setText] = useState<string>("");
    const [isPublic, setIsPublic] = useState<boolean>(false);

    const modalRef = useRef<HTMLDivElement>(null);

    // ARIA focus management: trap focus within modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
            onClose();
        }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
        document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleSubmit = () => {
        onSubmit({
            country,
            reviews: [
                {
                    id: Math.floor(Math.random() * 1000), // Temporary ID
                    title,
                    dato: date,
                    rating,
                    text,
                    public: isPublic,
                },
            ],
        });
        onClose();
    };

    return isOpen ? (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" ref={modalRef}>
            <aside className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="journalModalTitle">
                <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
                    &times;
                </button>
                <div className={styles.modalContent} role="document">
                    <h2 className={styles.journalEntryTitle}>Write your journal entry for {country}</h2>
                    <input
                        type="text"
                        placeholder="Title (max. 50 characters)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                        aria-label="Title input"
                        maxLength={50}
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={styles.input}
                        aria-label="Date input"
                    />
                    <textarea
                        placeholder="Relive the moment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className={styles.textArea}
                        aria-label="Journal entry text area"
                    />
                    {/* Star Rating System */}
                    <div className={styles.rating}>
                        <p className={styles.ratingLabel}>Rating:</p>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={star <= rating ? styles.starActive : styles.star}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={() => setIsPublic(!isPublic)}
                            aria-label="Public checkbox"
                        />
                        Public
                    </label>
                    <button onClick={handleSubmit} className={styles.submitButton} aria-label="Submit journal entry">
                        Save your journal entry
                    </button>
                </div>
            </aside>
        </div>
    ) : null;
}

export default JournalEntryModal;