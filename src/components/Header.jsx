
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

import Button from "../components/Button"
import { useNavigate } from 'react-router-dom'

function Header({ type, title }) {
    const navigate = useNavigate();
    let expandMenu = () => {
        alert("Not implemented yet")
    }

    const navigateBack = () => {
        navigate(-1);
    }

    switch (type) {
        case "main":
            return (
                <>
                    <header className="bg-(--primary-color) min-h-12 w-full gap-x-4 py-2 px-4 flex items-center justify-between">
                        <h1 className="text-white font-bold text-2xl cursor-pointer">VAST</h1>
                        <input type="text" placeholder='Search' className='w-full hidden px-4 bg-white h-8 rounded-sm text-(--text-primary) text-base outline-none' />
                        <div className='flex'>
                            <Button onClick={expandMenu} className="cursor-pointer" icon={<FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size='xl' />} />
                            <Button onClick={expandMenu} className="cursor-pointer" icon={<FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" size='xl' />} />
                        </div>
                    </header>
                </>
            )

        case "navigation":
            return (
                <>
                    <header className="bg-(--primary-color) min-h-12 w-full gap-x-4 py-2 px-4 flex items-center justify-between">
                        <Button onClick={navigateBack} icon={<FontAwesomeIcon icon="fa-solid fa-arrow-left-long" size='xl' />}></Button>
                    </header>
                </>
            )

        case "title":
            return (
                <>
                    <header className="bg-(--primary-color) text-white min-h-12 w-full gap-x-4 py-2 px-4 flex items-center justify-between">
                        <div className='flex items-center font-semibold'>
                            <Button onClick={navigateBack} icon={<FontAwesomeIcon icon="fa-solid fa-arrow-left-long" size='xl' />}></Button>
                            <h1 className='text-xl'>{title}</h1>
                        </div>
                        <div className='flex '>
                            <Button onClick={expandMenu} className="cursor-pointer" icon={<FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size='xl' />} />
                            <Button onClick={expandMenu} className="cursor-pointer" icon={<FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" size='xl' />} />
                        </div>
                    </header>
                </>
            )

        default:
            return (
                <>
                    <header className="bg-(--primary-color) min-h-12 w-full gap-x-4 py-2 px-4 flex items-center justify-between">
                        <h1 className="text-white font-bold text-2xl">VAST</h1>
                        <input type="text" placeholder='Search' className='w-full hidden px-4 bg-white h-8 rounded-sm text-(--text-primary) text-base outline-none' />
                        <div className='flex'>
                            <Button onClick={expandMenu} className="cursor-pointer" icon={<FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size='xl' />} />
                            <Button onClick={expandMenu} className="cursor-pointer" icon={<FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" size='xl' />} />
                        </div>
                    </header>
                </>
            )
    }
}

export default Header;