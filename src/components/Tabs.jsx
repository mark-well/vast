
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
import Spinner from "./Spinner/Spinner";

function Tabs({ className, subjectId }) {
    const { getSubjectById, getModulesFromSubject, addNewModuleToSubject, addSingleContentToModule, addContentToModule, addSingleFlashcard, getFlashcardsFromSubject, searchQuery, renameModule, renameSubject } = useContext(SubjectContext);
    const modules = getModulesFromSubject(subjectId);
    const flashcards = getFlashcardsFromSubject(subjectId);
    const [activeTab, setActiveTab] = useState(modules[0].id);
    const fileInputRef = useRef(null)
    const [file, setFile] = useState(null)
    const [isUploadActive, setIsUploadActive] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const { hideTTS } = useContext(TextToSpeechContext);
    const [showLoadingBlock, setShowLoadingBlock] = useState(false);
    const [showFlashcardLoading, setShowFlascardLoading] = useState(false);
    const [isServerAwake, setIsServerAwake] = useState(false);
    const [showServerLoading, setShowServerLoading] = useState(false);

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

        // Wake the server if anactive
        async function wakeServer() {
            try {
                let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wakeup`);
                let data = await response.json();
                if (data.status == "awake") {
                    setIsServerAwake(true);
                    setShowServerLoading(false);
                }
            } catch (error) {
                setTimeout(() => {
                    wakeServer()
                }, 1000)
            }
        }

        if (!isServerAwake) {
            wakeServer();
            setShowServerLoading(true);
            return;
        }

        // If no file is uplaoded alert the user
        if (fileInputRef.current.files.length == 0) {
            alert("Please select a file")
            return
        }

        setShowLoadingBlock(true);
        setShowFlascardLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        renameModule(subjectId, activeTab, file.name);
        if (getSubjectById(subjectId).title == "New Module") {
            renameSubject(subjectId, file.name);
        }

        const consumeStream = async (endpoint, formData, onData, onDone) => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${endpoint}`, {
                    method: 'POST',
                    body: formData
                });

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let buffer = "";

                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    let parts = buffer.split("\n\n");
                    buffer = parts.pop();

                    for (const part of parts) {
                        const line = part.trim();
                        if (!line.startsWith("data: ")) continue;

                        try {
                            const data = JSON.parse(line.replace("data: ", ""));
                            if (data.done) {
                                onDone();
                            } else {
                                onData(data);
                            }
                        } catch (e) {
                            console.error(`Error parsing JSON from ${endpoint}:`, e);
                        }
                    }
                }
            } catch (error) {
                console.error(`Stream from ${endpoint} failed:`, error);
            }
        };

        // Start both "threads" at once
        await Promise.all([
            // Task 1: Flashcards
            consumeStream(
                'generate-flashcard',
                formData,
                (data) => {
                    console.log("Flashcard: " + data);
                    addSingleFlashcard(subjectId, data);
                    setShowFlascardLoading(false);
                },
                () => {
                    console.log("Flashcards finished");
                }
            ).finally(() => setShowFlascardLoading(false)),

            // Task 2: Modules
            consumeStream(
                'generate-modules',
                formData,
                (data) => {
                    console.log("Module: " + data);
                    addSingleContentToModule(subjectId, activeTab, data);
                    setShowLoading(false);
                },
                () => {
                    console.log("Modules finished");
                    setShowLoadingBlock(false);
                }
            ).finally(() => setShowLoading(false))
        ]);
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
                    {
                        showServerLoading &&
                        <div>
                            <div className='absolute min-w-80 min-h-80 bg-stone-50 z-10 left-1/2 top-1/2 -translate-1/2 rounded-xl default-box-shadow flex flex-col justify-center items-center text-center px-4 py-0.5 gap-y-4'>
                                <Spinner />
                                <div>
                                    <p className='font-semibold'>The server is asleep due to inactivity</p>
                                    <p className='text-sm opacity-80'>Please wait while we wake the server...</p>
                                </div>
                            </div>
                            <div className='absolute w-full h-full bg-gray-900 opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
                        </div>
                    }

                    {(flashcards.length != 0 && showFlashcardLoading) && <Block type="loading_flashcards"></Block>}

                    {(modules.find(tab => tab.id === activeTab)?.contents == 0 && !showLoadingBlock) &&
                        <div>
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

                    {
                        showLoadingBlock && <Block type="loading"></Block>
                    }
                </div>
            </div >
        </>
    )
}

export default Tabs;