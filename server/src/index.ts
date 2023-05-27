import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import db from './db/database';

dotenv.config();
const PORT: number = ((process.env.PORT) || 7777) as number;
const HOST: string = process.env.HOST || "localhost";

const app = express();
app.use(express.json());
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body),
    ].join(' ');
}));

app.get('/api/users', async (_req, res) => {
    try {
        const userTable = await db.raw("SELECT * FROM users");
        res.json(userTable.rows);
    } catch (error) {
        throw error;
    }
});

app.get('/api/todos', async (_req, res) => {
    try {
        const todoTable = await db.raw("SELECT * FROM todos");
        res.json(todoTable.rows);
    } catch (error) {
        throw error;
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Listen to ${HOST}:${PORT}`);
});