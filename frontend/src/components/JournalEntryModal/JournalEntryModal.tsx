import { useState, useEffect, useRef } from "react";
import styles from "./JournalEntryModal.module.css";
import { FaStar } from "react-icons/fa";
import { removeQuotes } from "../../utils/utils";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { JournalTypeWrite } from "../../types/JournalType";

interface JournalEntryModalProps {
    country: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (entry: JournalTypeWrite) => void;
}

const JournalEntryModal = ({ country, isOpen, onClose }: JournalEntryModalProps) => {
    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [text, setText] = useState<string>("");
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const modalRef = useRef<HTMLDivElement>(null);
    const user = removeQuotes(sessionStorage.getItem("user")!);
    const navigate = useNavigate();

    const CREATE_REVIEW = gql`
        mutation addReview(
            $title: String!
            $date: String!
            $rating: Int!
            $text: String!
            $ispublic: Boolean!
            $profileid: String!
            $countryid: String!
        ) {
            addReview(
                title: $title
                date: $date
                rating: $rating
                text: $text
                ispublic: $ispublic
                profileid: $profileid
                countryid: $countryid
            ) {
                ispublic
            }
        }
    `;

    const [addReview] = useMutation(CREATE_REVIEW, {
        onCompleted: async () => {
            setError("");
            onClose();
            navigate(0);
        },
        onError: (error) => {
            setError(error.message);
        },
    });

    useEffect(() => {
        const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements?.[0] as HTMLElement;
        const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

        const trapFocus = (e: KeyboardEvent) => {
            if (e.key === "Tab") {
                if (document.activeElement === firstElement && e.shiftKey) {
                    e.preventDefault();
                    lastElement?.focus();
                } else if (document.activeElement === lastElement && !e.shiftKey) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        if (isOpen) {
            firstElement?.focus();
            document.addEventListener("keydown", trapFocus);
            document.body.classList.add("no-scroll"); // Add the class to disable scrolling
        } else {
            document.body.classList.remove("no-scroll"); // Remove the class to enable scrolling
        }

        return () => {
            document.removeEventListener("keydown", trapFocus);
            document.body.classList.remove("no-scroll"); // Clean up by removing the class
        };
    }, [isOpen]);

    const handleSubmit = () => {
        addReview({
            variables: {
                title: title,
                date: date,
                rating: rating,
                text: text,
                ispublic: isPublic,
                profileid: user,
                countryid: country,
            },
        });
    };

    return isOpen ? (
        <div
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            ref={modalRef}>
            <aside className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="journalModalTitle">
                <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
                    &times;
                </button>
                <div className={styles.modalContent} role="document">
                    <h2 className={styles.journalEntryTitle}>Write your journal entry for {country}</h2>
                    <input
                        type="text"
                        placeholder="Title"
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
                                tabIndex={0} // Make the stars keyboard accessible
                                role="button"
                                aria-pressed={star <= rating} // Screen reader announcement for the current state
                                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") setRating(star);
                                }}
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
                    {error !== "" && <h5>{error}</h5>}
                    <button onClick={handleSubmit} className={styles.submitButton} aria-label="Submit journal entry">
                        Save your journal entry
                    </button>
                </div>
            </aside>
        </div>
    ) : null;
};

export default JournalEntryModal;
