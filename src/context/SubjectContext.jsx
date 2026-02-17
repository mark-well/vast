import { createContext, useEffect, useState } from "react"
import { addModule, addSuject, dbDeleteModule, dbDeleteSubject, dbUpdateNotes, getSubjects } from "../db/db";

export const SubjectContext = createContext();

export function SubjectProvider({ children }) {
    const [subjects, setSubject] = useState([]);

    useEffect(() => {
        loadSubjects();
    }, []);

    async function loadSubjects() {
        const data = await getSubjects();
        setSubject(data);
    }

    async function addNewSubject(title) {
        await addSuject({
            "title": title,
            "modules": [
                {
                    "id": Date.now() + 1,
                    "name": "Module 3",
                    "contents": [
                        {
                            "id": 1,
                            "block_type": "paragraph",
                            "content": "This is a standalone paragraph, This is for Module Three"
                        },
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
                        },
                        {
                            "id": 4,
                            "block_type": "orderedList",
                            "title": "Fruits",
                            "content": [
                                "Apple",
                                "Banana",
                                "Pineapple"
                            ]
                        }
                    ]
                },
            ],
            "flashcards": [
                {
                    "id": 1,
                    "front": "THis is the front side",
                    "back": "This is the back side"
                },
                {
                    "id": 2,
                    "front": "THis is the front side",
                    "back": "This is the back side"
                }
            ],
            "notes": "Notes"
        });

        await loadSubjects();
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
            updateNotes
        }}>
            {children}
        </SubjectContext.Provider>
    )
}