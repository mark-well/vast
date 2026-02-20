
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import styles from "./TooltipSubject.module.css";

function TooltipSubject({ className }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const gotoFlashcard = () => {
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed) {
            return;
        }

        navigate(`/subject/${id}/flashcard`)
    }

    const gotoNotes = () => {
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed) {
            return;
        }

        navigate(`/subject/${id}/notes`)
    }

    return (
        <>
            <div className={`${styles.tooltip} default-box-shadow ${className || ''}`}>
                <ul>
                    <li><Button onClick={gotoNotes}>Notes</Button></li>
                    <li><Button onClick={gotoFlashcard}>Flashcards</Button></li>
                    <li><Button>Text to Speech</Button></li>
                </ul>
            </div>
        </>
    )
}

export default TooltipSubject;