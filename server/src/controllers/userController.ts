import db from '../db/database';
import { Response, Request} from 'express';
import bcrypt from 'bcrypt';

const listAll = async (_req: Request, res: Response) => {
    const users = await db.raw('SELECT * FROM users;');
    res.status(200).json(users.rows);
};

const listUser = async (req: Request, res: Response) => {
    const user = await db.raw(`
        SELECT * FROM users WHERE id = ?;`, 
        req.params.id
    );
    if (user.rowCount !== 0) {
        res.status(200).json(user.rows);
    } else {
        res.status(404).send({'message': 'not found'});
    }
};

const listTodosByUser = async (req: Request, res: Response) => {
    const user = await db.raw(`
        SELECT * FROM todos WHERE user_id = ?;`, 
        req.params.id
    );
    if (user.rowCount !== 0) {
        res.status(200).json(user.rows);
    } else {
        res.status(404).send({'message': 'not found'});
    }
};

const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    try {
        const newUser = await db.raw(`
            INSERT INTO users (name, email, password) 
            VALUES (?,?,?);`, 
            [name, email, passwordHash]
        );
        res.status(201).send(newUser.rows);
    } catch(error) {
        console.log(error);
        res.status(500).send({"message": "invalid request"});
    };
};

const updateUser = async (req: Request, res: Response) => {
    const { name, email, password} = req.body;
    try {
        const updatedUser = await db.raw(`
            UPDATE users
            SET name = ?, email = ?, password = ?
            WHERE id = ?`, 
            [name, email, password, req.params.id]
        );
        res.status(200).send(updatedUser);
    } catch(error) {
        res.status(500).send({"message": "invalid request"});
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await db.raw(`
            DELETE FROM todos WHERE id = ?;`, 
            req.params.id
        );
        res.status(200).send(deletedUser);
    } catch(error) {
        res.status(404).send({"message": "Can't find user with the id"});
    }
};
export default {
    listAll,
    listUser,
    listTodosByUser,
    createUser,
    updateUser,
    deleteUser
};
