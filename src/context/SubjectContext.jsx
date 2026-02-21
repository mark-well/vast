import { createContext, useEffect, useMemo, useState } from "react"
import { addModule, addSuject, dbDeleteModule, dbDeleteSubject, dbUpdateNotes, getSubjects } from "../db/db";

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

    async function addNewModuleToSubject(id) {
        let newModule = {
            "id": Date.now() + 1826,
            "name": "Module <Number>",
            "contents": [
                {
                    "id": 2,
                    "block_type": "paragraph",
                    "title": "This is a f*cking title",
                    "content": "This is a paragraph with a title or a heading"
                },
                {
                    "id": 3,
                    "block_type": "unorderedList",
                    "content": [
                        "Pen",
                        "Paper",
                        "Books"
                    ]
                }
            ]
        }
        await addModule(id, newModule);
        setSubject(prevSubject =>
            prevSubject.map(subject =>
                subject.id === id ? {
                    ...subject, modules: [...subject.modules, newModule]
                } : subject
            )
        )
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
            setSearchQuery
        }}>
            {children}
        </SubjectContext.Provider>
    )
}