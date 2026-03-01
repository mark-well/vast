
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)
import { Link, useNavigate } from 'react-router-dom'
import UploadBox from '../components/UploadBox'
import Button from '../components/Button'
import LoadingDialog from '../components/LoadingDialog/LoadingDialog'
import { useContext, useEffect, useRef, useState } from 'react'
import { SubjectContext } from '../context/SubjectContext'
import Spinner from '../components/Spinner/Spinner'

function GenerateReviewer() {

    const [showLoading, setShowLoading] = useState(false)
    const [isUploadActive, setIsUploadActive] = useState(false)
    const fileInputRef = useRef(null)
    const [file, setFile] = useState(null)
    const { addNewSubject } = useContext(SubjectContext)
    const navigate = useNavigate()
    const [isServerAwake, setIsServerAwake] = useState(false)

    const loadingDialogStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }

    useEffect(() => {
        fileInputRef.current.onchange = () => {
            if (fileInputRef.current.files != 0) {
                setIsUploadActive(true)
                setFile(fileInputRef.current.files[0])
            } else {
                setIsUploadActive(false)
            }
        }

        // Wake the server if anactive
        async function wakeServer() {
            try {
                let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wakeup`);
                let data = await response.json();
                if (data.status == "awake") setIsServerAwake(true)
            } catch (error) {
                setTimeout(() => {
                    wakeServer()
                }, 1000)
            }
        }

        wakeServer()
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        // If no file is uplaoded alert the user
        if (fileInputRef.current.files.length == 0) {
            alert("Please select a file")
            return
        }

        setShowLoading(true)
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/generate`, {
                method: 'post',
                body: formData
            })

            // Handle BAD responses
            if (!response.ok) {
                const errorData = await response.json();
                console.log(response.status)
                switch (response.status) {
                    case 400:
                        alert("File must be a PDF")
                        break
                }

                throw new Error(errorData.detail || "Something went wrong");
            }

            // Handle successful fetching
            const data = await response.json();
            let id = await addNewSubject(data.fileName, data.moduleBlocks, data.flashcards);
            navigate(`/subject/${id}`);
        } catch (error) {
            console.error("Upload Failed: " + error)
        } finally {
            setShowLoading(false);
        }
    }

    return (
        <>
            {
                isServerAwake ? '' : <div>
                    <div className='absolute min-w-80 min-h-80 bg-stone-50 z-10 left-1/2 top-1/2 -translate-1/2 rounded-xl default-box-shadow flex flex-col justify-center items-center text-center px-4 py-0.5 gap-y-4'>
                        <Spinner />
                        <div>
                            <p className='font-semibold'>The server is asleep due to inactivity</p>
                            <p className='text-sm opacity-80'>Please wait while we wake the server...</p>
                        </div>
                    </div>
                    <div className='absolute w-full h-full bg-gray-900 opacity-50'></div>
                </div>
            }

            <LoadingDialog show={showLoading} message="Your reviewer is being generated, please wait..." style={loadingDialogStyle} className='z-10' />
            {showLoading ? <div className='absolute w-full h-full bg-gray-900 opacity-50'></div> : ''}

            <form action="" method='post' required onSubmit={handleSubmit}>
                <div className="bg-(--primary-color) text-white min-h-12 w-full gap-x-4 py-2 px-4 flex items-center justify-between">
                    <Link to='/'><FontAwesomeIcon icon="fa-solid fa-arrow-left-long" size='xl' /></Link>
                </div>

                <div className='flex flex-col items-center '>
                    <h1 className='text-(--text-primary) text-2xl font-bold text-center mt-16'>Generate a new reviewer</h1>
                    <UploadBox ref={fileInputRef} />
                    <Button className={`${isUploadActive ? 'bg-(--secondary-color) text-[--text-primary]' : 'bg-[hsl(0,0%,85%)]'} p-4 min-w-36 mt-32 rounded-xs`} type="submit" disabled={isUploadActive ? false : true}>Generate</Button>
                </div>
            </form>
        </>
    )
}

export default GenerateReviewer