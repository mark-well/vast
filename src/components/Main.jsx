
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)
import openBox from "../assets/open-box.png";
import Button from '../components/Button'
import SubjectItem from './SubjectItem'
import { useContext, useState } from 'react'
import { SubjectContext } from '../context/SubjectContext'
import { useNavigate } from 'react-router-dom'
import ConfirmationDialog from './ConfirmationDialog/ConfirmationDialog'

function Main() {
    const navigate = useNavigate();
    const { subjects, addNewSubject, filteredItems, deleteSubject } = useContext(SubjectContext);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(0);

    const handleGenerate = async () => {
        let id = await addNewSubject("New Module", [], []);
        navigate(`/subject/${id}`);
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        setSubjectToDelete(id);
        setShowDeleteConfirmation(true);
    }

    const confirmDeleteSubject = async () => {
        const deleted = await deleteSubject(subjectToDelete);
        setSubjectToDelete(0);

        //If deletion is success
        if (deleted == 1) {
            setShowDeleteConfirmation(false);
        }
    }

    const cancelDeleteSubject = () => {
        setShowDeleteConfirmation(false);
        setSubjectToDelete(0);
    }

    if (!subjects.length == 0) {
        return (
            <>
                {showDeleteConfirmation && <ConfirmationDialog onPositive={confirmDeleteSubject} onNegative={cancelDeleteSubject} title="Delete Subject" message="Are you sure you want to delete this subject? This action cannot be undone." />}
                <main className='main grow flex flex-col gap-y-8'>
                    <div className='subject-list'>
                        {
                            filteredItems.map(subject => (
                                <SubjectItem id={subject.id} key={subject.id} title={subject.title} onDelete={(e) => handleDelete(e, subject.id)} />
                            ))
                        }
                    </div>
                    <div className='flex justify-center'>
                        <Button onClick={handleGenerate} icon={<FontAwesomeIcon icon="fa-solid fa-plus" />} className="text-[--text-secondary] px-4 py-2 bg-(--secondary-color) rounded-xs flex justify-center items-center gap-x-2" >New Reviewer</Button>
                        {/* <Button onClick={() => addNewSubject('asoufdgad', [{ "title": "end" }], [{}])} icon={<FontAwesomeIcon icon="fa-solid fa-plus" />} className="text-white min-h-12 px-4 py-2 bg-(--secondary-color) rounded-xs flex justify-center items-center gap-x-2" >New Reviewer</Button> */}
                    </div>
                </main>
            </>
        )
    }

    return (
        <>
            <main className="main grow flex flex-col justify-center items-center">
                <img src={openBox} className='pb-4' alt="" width="178" height="178" />
                <h2 className='text-(--text-primary) font-primary'>Collection is Empty</h2>
                <p className='text-(--text-secondary) font-secondary text-xs'>Click “New Reviewer” to create to add to your collection</p>
                <Button onClick={handleGenerate} icon={<FontAwesomeIcon icon="fa-solid fa-plus" />} className="text-[--text-secondary] px-4 py-2 mt-16 bg-(--secondary-color) rounded-xs flex justify-center items-center gap-x-2" >New Reviewer</Button>
                {/* <Button onClick={() => addNewSubject('asoufdgad', [{ "title": "end" }], [{}])} icon={<FontAwesomeIcon icon="fa-solid fa-plus" />} className="text-white min-h-12 px-4 py-2 mt-16 bg-(--secondary-color) rounded-xs flex justify-center items-center gap-x-2" >New Reviewer</Button> */}
            </main>
        </>
    )
}

export default Main