import { deleteDB, openDB } from "idb";

const DB_NAME = "vastDB";
const STORE_NAME = "subjects";

// deleteDB(DB_NAME)

export const dbPromise = openDB(DB_NAME, 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
    }
});

export async function addSuject(subject) {
    const db = await dbPromise;
    return db.put(STORE_NAME, subject);
}

export async function dbDeleteSubject(subjectId) {
    const db = await dbPromise;
    await db.delete(STORE_NAME, subjectId);
}

export async function getSubjects() {
    const db = await dbPromise;
    return db.getAll(STORE_NAME);
}

export async function addModule(subjectId, newModule) {
    const db = await dbPromise;
    const subject = await db.get(STORE_NAME, subjectId);
    if (!subject) return;

    subject.modules = subject.modules || [];
    subject.modules = [...subject.modules, newModule];
    await db.put(STORE_NAME, subject);
}

export async function dbAddContentToModule(subjectId, moduleId, newModuleBlocks) {
    const db = await dbPromise;
    const subject = await db.get(STORE_NAME, subjectId);
    if (!subject) return;

    subject.modules = subject.modules.map(module => {
        if (module.id != moduleId) return module;

        return {
            ...module,
            contents: [...module.contents, ...newModuleBlocks]
        }
    })

    await db.put(STORE_NAME, subject)
}

export async function dbAddSingleContentToModule(subjectId, moduleId, newContent) {
    const db = await dbPromise;
    const subject = await db.get(STORE_NAME, subjectId);
    if (!subject) return;

    subject.modules = subject.modules.map(module => {
        if (module.id != moduleId) return module;

        return {
            ...module,
            contents: [...module.contents, newContent]
        }
    })

    await db.put(STORE_NAME, subject)
}

export async function dbAddFlashcards(subjectId, newFlashcards) {
    const db = await dbPromise;
    const subject = await db.get(STORE_NAME, subjectId);
    if (!subject) return;

    subject.flashcards = subject.flascards || [];
    subject.flashcards = [...subject.flashcards, ...newFlashcards]
    await db.put(STORE_NAME, subject);
}

export async function dbAddSingleFlashcard(subjectId, newFlashcard) {
    const db = await dbPromise;
    const subject = await db.get(STORE_NAME, subjectId);
    if (!subject) return;

    subject.flashcards = subject.flascards || [];
    subject.flashcards = [...subject.flashcards, newFlashcard]
    await db.put(STORE_NAME, subject);
}

export async function dbDeleteModule(subjectId, moduleId) {
    const db = await dbPromise;
    const subject = db.get(STORE_NAME, subjectId);
    if (!subject) return;

    subject.modules = subject.modules.filter(mod => mod.id !== moduleId);
    await db.put(STORE_NAME, subject);
}

export async function dbUpdateNotes(subjectId, notes) {
    const db = await dbPromise;
    const subject = await db.get(STORE_NAME, subjectId);
    if (!subject) return;

    let updated = { ...subject, notes };
    await db.put(STORE_NAME, updated);
}