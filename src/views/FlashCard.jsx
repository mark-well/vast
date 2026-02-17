import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useContext, useEffect } from "react";
import { SubjectContext } from "../context/SubjectContext";

function FlashCard() {
    const { id } = useParams();
    const { getSubjectById } = useContext(SubjectContext);
    const subject = getSubjectById(Number(id))

    if (!subject) {
        return (
            <>
                <h1>404. Sorry the page you're looking for is not found.</h1>
            </>
        )
    }

    // Change document title
    useEffect(() => {
        document.title = "Flashcards | " + subject.title;
    }, []);

    return (
        <>
            <Header type="title" title={subject.title}></Header>
        </>
    )
}

export default FlashCard;