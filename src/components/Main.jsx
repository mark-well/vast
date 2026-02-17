
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)
import openBox from "../assets/open-box.png";
import Button from '../components/Button'
import SubjectItem from './SubjectItem'
import { useContext, useEffect, useState } from 'react'
import { SubjectContext } from '../context/SubjectContext'

function Main() {

    const { subjects, addNewSubject } = useContext(SubjectContext);

    if (!subjects.length == 0) {
        return (
            <>
                <main className='main grow flex flex-col gap-y-8'>
                    <div className='subject-list'>
                        {
                            subjects.map(subject => (
                                <SubjectItem id={subject.id} key={subject.id} title={subject.title} />
                            ))
                        }
                    </div>
                    <div className='flex justify-center'>
                        {/* <Button to="/generate" icon={<FontAwesomeIcon icon="fa-solid fa-plus" />} className="text-white px-4 py-2 bg-(--secondary-color) rounded-xs flex justify-center items-center gap-x-2" >New Reviewer</Button> */}
                        <Button onClick={() => addNewSubject("Subject " + Date.now())} icon={<FontAwesomeIcon icon="fa-solid fa-plus" />} className="text-white min-h-12 px-4 py-2 bg-(--secondary-color) rounded-xs flex justify-center items-center gap-x-2" >New Reviewer</Button>
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
                {/* <Button to="/generate" icon={<FontAwesomeIcon icon="fa-solid fa-plus" />} className="text-white px-4 py-2 mt-16 bg-(--secondary-color) rounded-xs flex justify-center items-center gap-x-2" /> */}
                <Button onClick={() => addNewSubject("Subject " + Date.now())} icon={<FontAwesomeIcon icon="fa-solid fa-plus" />} className="text-white min-h-12 px-4 py-2 mt-16 bg-(--secondary-color) rounded-xs flex justify-center items-center gap-x-2" >New Reviewer</Button>
            </main>
        </>
    )
}

export default Main