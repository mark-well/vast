
import { useNavigate } from "react-router-dom";
import styles from "./SubjectItem.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Button from "./Button";
library.add(fas, far, fab)

function SubjectItem({ id, title, onDelete }) {
    const navigate = useNavigate();

    const openSubject = () => {
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed) {
            return;
        }

        navigate(`/subject/${id}`)
    }

    return (
        <>
            <div className={styles.subjectItem} onClick={openSubject}>
                <p>{title}</p>
                <Button className="text-[--text-primary] cursor-pointer" onClick={onDelete} icon={<FontAwesomeIcon icon="fa-solid fa-trash" />}></Button>
            </div>
        </>
    )
}

export default SubjectItem;