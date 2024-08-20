import express, { Request, Response, RequestHandler } from 'express';
import {
    getNote as querySingleNote,
    getNotes as queryAllNotes,
    updateNote as updateDbNote,
    createNote as createNoteInDb,
    deleteNoteFromDB,
} from '../config/db-queries';

const getNote = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        res.status(403).json({ message: 'id must be specified' });
    }
    const result = await querySingleNote(id);
    res.status(200).json(result);
};

const getAllNotes = async (req: Request, res: Response) => {
    const result = await queryAllNotes();
    res.status(201).json(result);
};

const createNote = async (req: Request, res: Response) => {
    const { title, content, completed } = req.body;
    if (!title || !content) {
        res.status(403).json({
            message: 'validation failed all fields are mandatory',
        });
    }
    const result = await createNoteInDb({ title, content, completed });
    res.status(201).json(result);
};

const updateNote = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!req.body) {
        res.json('validation failed fields are mandatory').status(403);
    }
    const result = await updateDbNote(id, req.body);
    res.status(201).json({ message: 'note update successfully', result });
};

const delteNote = async (req: Request, res: Response) => {
    const id = req.params.id;
    const [result] = await deleteNoteFromDB(id);
    res.status(201).json({ message: 'note update successfully', result });
};

export { getNote, getAllNotes, updateNote, createNote, delteNote };
