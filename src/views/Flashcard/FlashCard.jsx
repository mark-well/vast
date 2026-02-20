import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import { SubjectContext } from "../../context/SubjectContext";
import styles from "./FlashCard.module.css"
import FlashcardItem from "./components/FlashcardItem";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FlashCard() {
    const { id } = useParams();
    const { getSubjectById } = useContext(SubjectContext);
    const [subject, setSubject] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Get subject then load
    useEffect(() => {
        let sb = getSubjectById(Number(id));
        setSubject(sb)
        document.title = sb ? "Flashcards | " + sb.title : "Flashcards";
    }, [id, getSubjectById]);

    // FLip the current card
    const flipCard = () => {
        if (isFlipped) {
            setIsFlipped(false)
        } else {
            setIsFlipped(true)
        }
    }

    const slideTransform = {
        transform: `translateX(-${currentIndex * (288 + 16)}px)`
    }

    const previousCard = () => {
        setCurrentIndex(Math.max(0, currentIndex - 1));
        setIsFlipped(false);
    }

    const nextCard = () => {
        setCurrentIndex(Math.min(subject.flashcards.length - 1, currentIndex + 1));
        setIsFlipped(false);
    }

    if (!subject) return (<h1>404. Sorry the page you're looking for is not found.</h1>)
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header type="title" title={subject.title}></Header>
                <div className="grow">
                    <div className="flex px-8 my-4 justify-between text-base">
                        <h2 className="font-semibold font-primary">Flashcards</h2>
                        <p className="font-secondary">{currentIndex}/{subject.flashcards.length}</p>
                    </div>

                    <div className="flex flex-col items-center gap-y-24">
                        <div className={styles.sliderContainer}>
                            <div style={slideTransform} className={`${styles.cardHolder}`}>
                                {
                                    subject.flashcards.map((card, i) => <FlashcardItem key={i} front={card.front} back={card.back} isFlipped={i === currentIndex && isFlipped} />)
                                }
                            </div>
                        </div>
                        <div className="flex items-center gap-x-8">
                            <Button onClick={previousCard} className={`${styles.arrowButton}`} icon={<FontAwesomeIcon icon="fa-solid fa-angle-left" size="xl" />} />
                            <Button onClick={flipCard} className={`${styles.flipButton} default-box-shadow`}>Flip</Button>
                            <Button onClick={nextCard} className={`${styles.arrowButton}`} icon={<FontAwesomeIcon icon="fa-solid fa-angle-right" size="xl" />} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FlashCard;