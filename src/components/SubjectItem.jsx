
import { useNavigate } from "react-router-dom";
import styles from "./SubjectItem.module.css"

function SubjectItem({ id, title }) {
    const navigate = useNavigate();
    const openSubject = () => {
        navigate(`/subject/${id}`)
    }

    return (
        <>
            <div className={styles.subjectItem} onClick={openSubject}>
                <p>{title}</p>
            </div>
        </>
    )
}

export default SubjectItem;