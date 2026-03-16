
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)
import openBox from "../assets/open-box.png";
import Button from '../components/Button'
import SubjectItem from './SubjectItem'
import { useContext, useRef, useState } from 'react'
import { SubjectContext } from '../context/SubjectContext'
import { useNavigate } from 'react-router-dom'
import ConfirmationDialog from './ConfirmationDialog/ConfirmationDialog'

function Main() {
    const navigate = useNavigate();
    const { subjects, addNewSubject, filteredItems, deleteSubject, renameSubject } = useContext(SubjectContext);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(0);
    const [renameInputVisible, setRenameInputVisible] = useState(false);
    const renameInput = useRef("");
    const [subjectToRename, setSubjectToRename] = useState(0);

    const handleGenerate = async () => {
        let id = await addNewSubject("New Subject", [], []);
        navigate(`/subject/${id}`);
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        setSubjectToDelete(id);
        setShowDeleteConfirmation(true);
    }

    const handleRename = (e, id) => {
        e.stopPropagation();
        setRenameInputVisible(true);
        setSubjectToRename(id);
    }

    const validateRename = () => {
        let input = renameInput.current.value;
        if (input == "") {
            alert("Input cannot be empty");
            return;
        }

        renameSubject(subjectToRename, input);
        setRenameInputVisible(false);
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
                {renameInputVisible && <div className={`rename-input flex flex-col z-2 absolute bg-white w-4/5 h-64 max-w-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md`}>
                    <div className='w-full flex px-4 py-2 justify-between items-center'>
                        <h2 className='font-medium truncate'>Rename this subject</h2>
                        <Button icon={<FontAwesomeIcon icon="fa-solid fa-x" size='md' />} onClick={() => setRenameInputVisible(false)}></Button>
                    </div>
                    <div className='w-full h-0.5 bg-gray-300'></div>
                    <div className='grow flex flex-col p-4 justify-between items-center w-full'>
                        <div className='flex flex-col items-center w-full'>
                            <label htmlFor="rename-input">Enter name:</label>
                            <input ref={renameInput} type="text" id="rename-input" className='border w-10/12 h-8 px-2 outline-none' />
                        </div>
                        <Button className={`bg-(--secondary-color) px-8 py-2 rounded-sm default-box-shadow`} onClick={validateRename}>Confirm</Button>
                    </div>
                </div>}
                {renameInputVisible && <div className='z-1 bg-black opacity-30 absolute w-full h-full'></div>}

                <main className='main grow flex flex-col gap-y-8'>
                    <div className='subject-list'>
                        {
                            filteredItems.map(subject => (
                                <SubjectItem id={subject.id} key={subject.id} title={subject.title} onDelete={(e) => handleDelete(e, subject.id)} onRename={(e) => handleRename(e, subject.id)} />
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