
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import styles from "./TooltipSubject.module.css";
import { useContext } from "react";
import { TextToSpeechContext } from "./TTSControl/TextToSpeechContext";

function TooltipSubject({ className }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { hideTTS, setHideTTS } = useContext(TextToSpeechContext);

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

    const handleTextToSpeech = () => {
        if (hideTTS) {
            setHideTTS(false)
        } else {
            setHideTTS(true);
        }
    }

    return (
        <>
            <div className={`${styles.tooltip} default-box-shadow ${className || ''}`}>
                <ul>
                    <li><Button onClick={gotoNotes}>Notes</Button></li>
                    <li><Button onClick={gotoFlashcard}>Flashcards</Button></li>
                    <li><Button onClick={handleTextToSpeech}>Text to Speech</Button></li>
                </ul>
            </div>
        </>
    )
}

export default TooltipSubject;