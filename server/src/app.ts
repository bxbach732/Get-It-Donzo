import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import db from './db/database';
import todoRouter from './routes/todoRouter';
import userRouter from './routes/userRouter';
// import authRouter from './routes/authRouter';


const app = express();
app.use(cors());
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

app.use('/api/todos', todoRouter);
app.use('/api/users', userRouter);

export default app;