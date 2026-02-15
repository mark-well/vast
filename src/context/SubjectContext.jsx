import { createContext, useEffect, useState } from "react"

export const SubjectContext = createContext();

export function SubjectProvider({ children }) {

    const [subjects, setSubject] = useState(() => {
        const savedSubjects = localStorage.getItem("subjects");
        return savedSubjects ? JSON.parse(savedSubjects) : [];
    });

    useEffect(() => {
        localStorage.setItem("subjects", JSON.stringify(subjects));
    }, [subjects]);

    const addNewSubject = (title) => {
        setSubject(prev => [
            ...prev,
            {
                "id": Date.now(),
                "title": title,
                "modules": [
                    {
                        "id": 3,
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
                ]
            }
        ])
    }

    const getSubjectById = (id) => {
        return subjects.find(s => s.id === Number(id));
    }

    const getModulesFromSubject = (id) => {
        return getSubjectById(id).modules;
    }

    const addNewModuleToSubject = (id) => {
        setSubject(prevSubject =>
            prevSubject.map(subject =>
                subject.id === id ? {
                    ...subject, modules: [...subject.modules, {
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
                    }]
                } : subject
            )
        )
    }

    return (
        <SubjectContext.Provider value={{
            subjects,
            getSubjectById,
            addNewSubject,
            getModulesFromSubject,
            addNewModuleToSubject
        }}>
            {children}
        </SubjectContext.Provider>
    )
}