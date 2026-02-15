
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)
import { Link } from 'react-router-dom'
import UploadBox from '../components/UploadBox'
import Button from '../components/Button'

function GenerateReviewer() {
    return (
        <>
            <div className="bg-(--primary-color) text-white min-h-12 w-full gap-x-4 py-2 px-4 flex items-center justify-between">
                <Link to='/'><FontAwesomeIcon icon="fa-solid fa-arrow-left-long" size='xl' /></Link>
            </div>

            <div className='flex flex-col items-center '>
                <h1 className='text-(--text-primary) text-2xl font-bold text-center mt-16'>Generate a new reviewer</h1>
                <UploadBox />
                <Button className="bg-[hsl(0,0%,85%)] p-4 min-w-36 mt-32 rounded-xs" >Generate</Button>
            </div>
        </>
    )
}

export default GenerateReviewer