import express from 'express';
import {
    createNote,
    delteNote,
    getAllNotes,
    getNote,
    updateNote,
} from '../controllers/todo-controller';
const router = express.Router();

router.get('/api/todos/:id', getNote);
router.get('/api/todos/', getAllNotes);
router.put('/api/todos/:id', updateNote);
router.post('/api/todos', createNote);
router.delete('/api/todos/:id', delteNote);

module.exports = router;
