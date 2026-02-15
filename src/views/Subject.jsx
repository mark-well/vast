import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import { useContext } from "react";
import { SubjectContext } from "../context/SubjectContext";

function Subject() {
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

    return (
        <>
            <div className="flex flex-col min-h-dvh">
                <Header type="title" title={subject.title}></Header>
                <Tabs subjectId={Number(id)}></Tabs>
            </div>
        </>
    )
}

export default Subject;