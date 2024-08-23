import { createNotePayload } from '../types/types';
const pool = require('./connect-db');

async function getNotes() {
    const [rows] = await pool.query(
        'SELECT * FROM todos ORDER BY created_At desc',
    );
    return rows;
}

async function getNote(id: string) {
    const [result]: any = await pool.query(
        `select id,title,content,created_At from todos where id=?`,
        [id],
    );
    return result[0];
}

async function createNote({ title, content, completed }: createNotePayload) {
    if (!title || !content || !completed) {
    }

    const [result]: any = await pool.query(
        `insert into todos(title,content,completed) values(?,?,?)`,
        [title, content, completed],
    );
    const id = result.insertId;
    const todo = getNote(id);
    return todo;
}
async function updateNote(
    id: number,
    body: { title: string; content: string; completed: number },
) {
    const { title, content, completed } = body;
    if (!title && !content) {
        try {
            const result = await pool.query(
                `update  todos set completed=? where id =?`,
                [completed ?? 0, id],
            );
            return result;
        } catch (error: any) {
            console.log(error);
        }
    }
    try {
        const result = await pool.query(
            `UPDATE todos SET title=? content=? completed=? WHERE id=? `,
            [title, content, completed ?? 0, id],
        );
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function deleteNoteFromDB(id: string) {
    if (!id) return;
    const result = await pool.query(`delete from todos where id=?`, [id]);
    return result;
}
export { getNote, getNotes, createNote, updateNote, deleteNoteFromDB };
