import { createContext, useEffect, useMemo, useState } from "react"
import { addModule, addSuject, dbDeleteModule, dbDeleteSubject, dbUpdateNotes, getSubjects, dbAddFlashcards, dbAddContentToModule, dbAddSingleContentToModule, dbAddSingleFlashcard, dbRenameModule, dbRenameSubject } from "../db/db";

export const SubjectContext = createContext();

export function SubjectProvider({ children }) {
    const [subjects, setSubject] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        loadSubjects();
    }, []);

    const filteredItems = useMemo(() => {
        if (!searchQuery) return subjects;

        return subjects.filter(subject =>
            subject.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
        );
    });

    async function loadSubjects() {
        const data = await getSubjects();
        setSubject(data);
    }

    function generateIdSequential() {
        let latestIndex = Number(localStorage.getItem("latestIndex")) || 0;
        let newIndex = latestIndex + 1;
        localStorage.setItem("latestIndex", newIndex);

        return newIndex;
    }

    async function addNewSubject(title, module_blocks, flashcards) {
        flashcards ? flashcards.map(fl => fl['id'] = generateIdSequential()) : flashcards = []
        module_blocks ? module_blocks.map(mb => mb['id'] = generateIdSequential()) : module_blocks = []

        let id = await addSuject({
            "title": title,
            "modules": [
                {
                    "id": generateIdSequential(),
                    "name": title,
                    "contents": module_blocks
                },
            ],
            "flashcards": flashcards,
            "notes": ""
        });
        await loadSubjects();
        return id;
    }

    async function deleteSubject(id) {
        setSubject(prev =>
            prev.filter(subject => subject.id !== id)
        );

        await dbDeleteSubject(id);
    }

    const getSubjectById = (id) => {
        return subjects.find(s => s.id === Number(id));
    }

    const getModulesFromSubject = (id) => {
        return getSubjectById(id).modules;
    }

    const getFlashcardsFromSubject = (id) => {
        return getSubjectById(id).flashcards;
    }

    const renameSubject = (id, newName) => {
        setSubject(prev => prev.map(subject =>
            subject.id == id ? { ...subject, title: newName } : subject
        ));

        dbRenameSubject(id, newName);
    }

    const renameModule = (subjectId, moduleId, newName) => {
        setSubject(prevSubjects =>
            prevSubjects.map(subject => {
                // 1. Find the right subject
                if (subject.id !== subjectId) return subject;

                return {
                    ...subject,
                    modules: subject.modules.map(ml => {
                        // 2. Find the right module
                        if (ml.id !== moduleId) return ml;

                        // 3. Append the new content to the existing contents array
                        return {
                            ...ml,
                            name: newName
                        };
                    })
                };
            })
        );

        dbRenameModule(subjectId, moduleId, newName);
    }

    async function addNewModuleToSubject(id) {
        // moduleBlocks ? moduleBlocks.map(mb => mb['id'] = generateIdSequential()) : moduleBlocks = []
        let moduleId = Date.now() + 1826;
        let newModule = {
            "id": moduleId,
            "name": `Module ${moduleId}`,
            "contents": []
        }
        await addModule(id, newModule);
        setSubject(prevSubject =>
            prevSubject.map(subject =>
                subject.id === id ? {
                    ...subject, modules: [...subject.modules, newModule]
                } : subject
            )
        )

        return moduleId;
    }

    async function addContentToModule(subjectId, moduleId, newContent) {
        newContent ? newContent.map(mb => mb['id'] = generateIdSequential()) : newContent = []
        setSubject(prevSubjects =>
            prevSubjects.map(subject => {
                // 1. Find the right subject
                if (subject.id !== subjectId) return subject;

                return {
                    ...subject,
                    modules: subject.modules.map(ml => {
                        // 2. Find the right module
                        if (ml.id !== moduleId) return ml;

                        // 3. Append the new content to the existing contents array
                        return {
                            ...ml,
                            contents: [...ml.contents, ...newContent]
                        };
                    })
                };
            })
        );

        await dbAddContentToModule(subjectId, moduleId, newContent);
    }

    function addSingleContentToModule(subjectId, moduleId, newContent) {
        newContent ? newContent.id = generateIdSequential() : newContent = {}
        setSubject(prevSubjects =>
            prevSubjects.map(subject => {
                // 1. Find the right subject
                if (subject.id !== subjectId) return subject;

                return {
                    ...subject,
                    modules: subject.modules.map(ml => {
                        // 2. Find the right module
                        if (ml.id !== moduleId) return ml;

                        // 3. Append the new content to the existing contents array
                        return {
                            ...ml,
                            contents: [...ml.contents, newContent]
                        };
                    })
                };
            })
        );

        dbAddSingleContentToModule(subjectId, moduleId, newContent);
    }

    function addSingleFlashcard(subjectId, newFlashCard) {
        newFlashCard ? newFlashCard.id = generateIdSequential() : newFlashCard = {}
        setSubject(prevSubjects =>
            prevSubjects.map(subject => {
                // 1. Find the right subject
                if (subject.id !== subjectId) return subject;

                return {
                    ...subject,
                    flashcards: [...subject.flashcards, newFlashCard]
                };
            })
        );

        dbAddSingleFlashcard(subjectId, newFlashCard);
    }

    async function deleteModule(subjectId, moduleId) {
        setSubject(prev =>
            prev.map(subject => {
                if (subject.id === subjectId) {
                    return {
                        ...subject,
                        modules: subject.modules.filter(m => m.id !== moduleId)
                    }
                }
                return subjects;
            })
        );

        await dbDeleteModule(subjectId, moduleId);
    }

    async function updateNotes(subjectId, newNotes) {
        setSubject(prev =>
            prev.map(subject => {
                if (subject.id === subjectId) {
                    return {
                        ...subject,
                        notes: newNotes
                    }
                }
                return subject;
            })
        );

        await dbUpdateNotes(subjectId, newNotes);
    }

    return (
        <SubjectContext.Provider value={{
            subjects,
            getSubjectById,
            addNewSubject,
            getModulesFromSubject,
            addNewModuleToSubject,
            deleteSubject,
            deleteModule,
            updateNotes,
            filteredItems,
            setSearchQuery,
            addContentToModule,
            searchQuery,
            addSingleContentToModule,
            addSingleFlashcard,
            getFlashcardsFromSubject,
            renameModule,
            renameSubject
        }}>
            {children}
        </SubjectContext.Provider>
    )
}