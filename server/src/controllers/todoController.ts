import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db/database';
import { Response, Request} from 'express';

dotenv.config();

const getTokenFrom = (req: Request) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '');
    }
    return null;
};

const listAll = async (_req: Request, res: Response) => {
    const todos = await db.raw('SELECT * FROM todos;');
    res.status(200).json(todos.rows);
};

const listTodo = async (req: Request, res: Response) => {
    const todo = await db.raw(`
        SELECT * FROM todos WHERE id = ?;`, 
        req.params.id
    );
    if (todo.rowCount !== 0) {
        res.status(200).send(todo.rows);
    } else {
        res.status(404).send({'message': 'not found'});
    }
};

const createTodo = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const secret = process.env.SECRET || 'DEFAULT_SECRET';
    const token = getTokenFrom(req);

    if (!token) {
        return res.status(401).json({ error: 'token invalid' });
    }

    try {
        const decodedToken = jwt.verify(token, secret);
    
        if (typeof decodedToken === 'string' || !decodedToken.id) {
            return res.status(401).json({ error: 'token invalid' });
        }
        const user = (await db.raw(`
            SELECT * FROM users 
            WHERE id = ?;`,
            decodedToken.id
        )).rows[0];

        const newTodo = await db.raw(`
            INSERT INTO todos (title, description, user_id) 
            VALUES (?, ?, ?);`, 
            [title, description, user.id]
        );
        return res.status(200).send(newTodo.rows);
    } catch(error) {
        return res.status(500).send({"message": "invalid request"});
    }
};

const updateTodo = async (req: Request, res: Response) => {
    const { title, description, completed} = req.body;
    try {
        const updatedTodo = await db.raw(`
            UPDATE todos
            SET title = ?, description = ?, completed = ?
            WHERE id = ?`, 
            [title, description, completed, req.params.id]
        );
        res.status(200).send(updatedTodo);
    } catch(error) {
        res.status(500).send({"message": "invalid request"});
    }
};

const deleteTodo = async (req: Request, res: Response) => {
    try {
        const deletedTodo = await db.raw(`
            DELETE FROM todos WHERE id = ?;`, 
            req.params.id
        );
        res.status(200).send(deletedTodo);
    } catch(error) {
        res.status(404).send({"message": "Can't find todo with the id"});
    }
};

export default {
    listAll,
    listTodo,
    createTodo,
    updateTodo,
    deleteTodo
};
