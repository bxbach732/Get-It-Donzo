import express from 'express';
import todoController from '../controllers/todoController';
import authMiddleware from '../utils/authMiddleware';

const todoRouter = express.Router();

todoRouter.get("/", todoController.listAll);
todoRouter.get("/:id", authMiddleware, todoController.listTodo);
todoRouter.post("/", authMiddleware ,todoController.createTodo);
todoRouter.put("/:id", authMiddleware, todoController.updateTodo);
todoRouter.delete("/:id", authMiddleware, todoController.deleteTodo);

export default todoRouter;