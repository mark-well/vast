import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubjectContext } from "../../context/SubjectContext";
import Header from "../../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "./Notes.module.css";
import Button from "../../components/Button";

function Notes() {
    const [subject, setSubject] = useState(null);
    const [notes, setNotes] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const { getSubjectById, updateNotes } = useContext(SubjectContext);

    useEffect(() => {
        let loadSubjects = () => {
            let sb = getSubjectById(Number(id));
            setSubject(sb);
            document.title = sb ? "Notes | " + sb.title : "Notes";
        }

        loadSubjects();
    }, [id, getSubjectById]);

    const navigateBack = async () => {
        saveToDb();
        navigate(-1);
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            saveToDb();
        }, 2000);

        return () => clearTimeout(timer);
    }, [notes]);

    const saveToDb = async () => {
        await updateNotes(subject.id, notes);
    }

    useEffect(() => {
        if (subject) {
            setNotes(subject.notes);
        }
    }, [subject]);

    if (!subject) return <h1>Loading...</h1>;

    return (
        <>
            <div className="w-full min-h-dvh flex flex-col">
                <Header type="title" title={subject.title}></Header>
                <div className="px-4 py-2 grow">
                    <div className={`${styles.notesHeaderWrapper}`}>
                        <h2 className="font-bold">Notes</h2>
                        <Button onClick={navigateBack} icon={<FontAwesomeIcon icon="fa-solid fa-x" />}></Button>
                    </div>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} name="notes-area" className={styles.notesArea} id="notes-area"></textarea>
                </div>
            </div>
        </>
    )
}

export default Notes;