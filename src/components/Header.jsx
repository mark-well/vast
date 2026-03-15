
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

import Button from "../components/Button"
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import TooltipMain from './TooltipMain'
import TooltipSubject from './TooltipSubject'
import { SubjectContext } from '../context/SubjectContext'

function Header({ type, title }) {
    const navigate = useNavigate();
    let [isSearchBarHidden, setSearchBar] = useState(true);
    let [isTooltipHidden, setTooltip] = useState(true);
    const { setSearchQuery } = useContext(SubjectContext);

    let expandMenu = () => {
        alert("Not implemented yet")
    }

    const navigateBack = () => {
        navigate(-1);
    }

    let toggleSearchBar = () => {
        if (isSearchBarHidden) {
            setSearchBar(false);
        } else {
            setSearchBar(true);
        }
    }

    let toggleTooltip = () => {
        if (isTooltipHidden) {
            setTooltip(false);
        } else {
            setTooltip(true);
        }
    }

    switch (type) {
        case "main":
            return (
                <>
                    <header className="bg-(--primary-color) text-white min-h-12 w-full gap-x-4 py-2 px-4 flex items-center justify-between">
                        <h1 className={`text-white font-bold text-2xl cursor-pointer ${isSearchBarHidden ? '' : 'hidden'}`}>VAST</h1>
                        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search' className={`w-full z-2 ${isSearchBarHidden ? 'hidden' : ''} px-4 bg-white h-8 rounded-sm text-(--text-primary) text-base outline-none`} />
                        <div className={`${isSearchBarHidden ? 'hidden' : ''} backdrop absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-1`} onClick={toggleSearchBar}></div>
                        <div className='flex'>
                            <Button onClick={toggleSearchBar} className="cursor-pointer" icon={<FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size='xl' />} />
                            <Button onClick={toggleTooltip} className="cursor-pointer" icon={<FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" size='xl' />} />
                        </div>
                        <TooltipMain className={`${isTooltipHidden ? 'hidden' : ''} z-2`}></TooltipMain>
                        <div className={`${isTooltipHidden ? 'hidden' : ''} backdrop absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-1`} onClick={toggleTooltip}></div>
                    </header>
                </>
            )

        case "navigation":
            return (
                <>
                    <header className="bg-(--primary-color) text-white min-h-12 w-full gap-x-4 py-2 px-4 flex items-center justify-between">
                        <Button onClick={navigateBack} icon={<FontAwesomeIcon icon="fa-solid fa-arrow-left-long" size='xl' />}></Button>
                    </header>
                </>
            )

        case "title":
            return (
                <>
                    <header className="bg-(--primary-color) text-white min-h-12 w-full gap-x-4 py-2 px-4 flex items-center justify-between">
                        <div className={`flex items-center font-semibold ${isSearchBarHidden ? "min-w-44" : ""}`}>
                            <Button onClick={navigateBack} icon={<FontAwesomeIcon icon="fa-solid fa-arrow-left-long" size='xl' />}></Button>
                            <h1 className={`text-lg truncate ${isSearchBarHidden ? '' : 'hidden'}`}>{title}</h1>
                        </div>
                        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search' className={`w-full z-2 px-4 ${isSearchBarHidden ? 'hidden' : ''} bg-white h-8 rounded-sm text-(--text-primary) text-base outline-none`} />
                        <div className={`${isSearchBarHidden ? 'hidden' : ''} backdrop absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-1`} onClick={toggleSearchBar}></div>
                        <div className='flex'>
                            <Button onClick={toggleSearchBar} className="cursor-pointer" icon={<FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size='xl' />} />
                            <Button onClick={toggleTooltip} className="cursor-pointer" icon={<FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" size='xl' />} />
                        </div>
                    </header>
                    <TooltipSubject className={`${isTooltipHidden ? 'hidden' : ''}`}></TooltipSubject>
                    <div className={`${isTooltipHidden ? 'hidden' : ''} backdrop absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-1`} onClick={toggleTooltip}></div>
                </>
            )

        default:
            return (
                <>
                    <header className="bg-(--primary-color) text-white min-h-12 w-full gap-x-4 py-2 px-4 flex items-center justify-between">
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