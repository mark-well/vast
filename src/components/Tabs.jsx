
import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./Tabs.module.css";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Block from "./Block";
import { SubjectContext } from "../context/SubjectContext";
import UploadBox from "./UploadBox";
import { useRef } from "react";
import LoadingDialog from "./LoadingDialog/LoadingDialog";
import TextToSpeechControl from "./TTSControl/TextToSpeechControl";
import { TextToSpeechContext } from "./TTSControl/TextToSpeechContext";

function Tabs({ className, subjectId }) {
    const { getModulesFromSubject, addNewModuleToSubject, addContentToModule, addFlashcards, searchQuery } = useContext(SubjectContext);
    const modules = getModulesFromSubject(subjectId);
    const [activeTab, setActiveTab] = useState(modules[0].id);
    const fileInputRef = useRef(null)
    const [file, setFile] = useState(null)
    const [isUploadActive, setIsUploadActive] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const { hideTTS } = useContext(TextToSpeechContext);

    const loadingDialogStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }

    const filteredContents = useMemo(() => {
        // 1. Find the specific module for the active tab
        const activeModule = modules.find(mdl => mdl.id === activeTab);

        // Safety check: if no module is found or no query exists, return all contents of that module
        if (!activeModule) return [];
        if (!searchQuery.trim()) return activeModule.contents;

        const query = searchQuery.toLowerCase().trim();

        // 2. Filter the contents of ONLY that active module
        return activeModule.contents.filter(item => {
            const titleMatch = item.title?.toLowerCase().includes(query);

            // Handle content being either a string or an array of strings
            const bodyText = Array.isArray(item.content)
                ? item.content.join(' ')
                : (item.content || '');

            const bodyMatch = bodyText.toLowerCase().includes(query);

            return titleMatch || bodyMatch;
        });
    }, [modules, activeTab, searchQuery]);

    useEffect(() => {
        if (fileInputRef.current == null) return;
        fileInputRef.current.onchange = () => {
            if (fileInputRef.current.files != 0) {
                setIsUploadActive(true)
                setFile(fileInputRef.current.files[0])
            } else {
                setIsUploadActive(false)
            }
        }
    });

    const newModule = async () => {
        let moduleId = await addNewModuleToSubject(subjectId);
        setActiveTab(moduleId);
    }

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
            addContentToModule(subjectId, activeTab, data.moduleBlocks);
        } catch (error) {
            console.error("Upload Failed: " + error)
        } finally {
            setShowLoading(false);
        }
    }

    return (
        <>
            <div className={`flex flex-col grow ${className || ""})`}>
                <TextToSpeechControl contents={modules.find(tab => tab.id === activeTab)?.contents} hide={hideTTS} />
                <div className={`${styles.tabsHeader}`}>
                    {
                        modules.map(tab => (
                            <Button key={tab.id} className={`${styles.tabs} ${activeTab === tab.id ? `${styles.activeTab}` : ""}`} onClick={() => { setActiveTab(tab.id) }}>{tab.name}</Button>
                        ))
                    }
                    <Button className={`${styles.addModuleButton} text-[--text-primary]`} onClick={newModule} icon={<FontAwesomeIcon icon="fa-solid fa-plus" />}></Button>
                </div>

                {/* Tab Container */}
                <div className={`${styles.tabContentContainer}`}>



                    {modules.find(tab => tab.id === activeTab)?.contents == 0 &&
                        <div>
                            <LoadingDialog show={showLoading} message="Your reviewer is being generated, please wait..." style={loadingDialogStyle} className='z-10' />
                            {showLoading ? <div className='absolute w-full h-full bg-gray-900 opacity-50'></div> : ''}

                            <form action="" method='post' required onSubmit={handleSubmit}>
                                <div className='flex flex-col items-center '>
                                    <UploadBox ref={fileInputRef} />
                                    <Button className={`${isUploadActive ? 'bg-(--secondary-color) text-[--text-primary]' : 'bg-[hsl(0,0%,85%)]'} p-4 min-w-36 mt-32 rounded-xs`} type="submit" disabled={isUploadActive ? false : true}>Generate</Button>
                                </div>
                            </form>
                        </div>
                    }

                    {

                        filteredContents.map(block => {
                            if (block.block_type == "paragraph") {
                                return (
                                    <Block key={block.id} type={block.block_type} title={block.title || ""}>
                                        <p>{block.content}</p>
                                    </Block>
                                )
                            } else if (block.block_type == "ordered_list") {
                                return (
                                    <Block key={block.id} type="orderedList" title={block.title} items={block.content}></Block>
                                )
                            } else if (block.block_type == "unordered_list") {
                                return (
                                    <Block key={block.id} type="unorderedList" title={block.title} items={block.content}></Block>
                                )
                            }
                            return null
                        })
                    }
                    {/* {

                        modules.find(tab => tab.id === activeTab)?.contents.map(block => {
                            if (block.block_type == "paragraph") {
                                return (
                                    <Block key={block.id} type={block.block_type} title={block.title || ""}>
                                        <p>{block.content}</p>
                                    </Block>
                                )
                            } else if (block.block_type == "orderedList") {
                                return (
                                    <Block key={block.id} type="orderedList" title={block.title} items={block.content}></Block>
                                )
                            } else if (block.block_type == "unorderedList") {
                                return (
                                    <Block key={block.id} type="unorderedList" title={block.title} items={block.content}></Block>
                                )
                            }
                            return null
                        })
                    } */}
                </div>
            </div >
        </>
    )
}

export default Tabs;