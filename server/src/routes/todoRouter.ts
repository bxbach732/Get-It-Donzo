import express from 'express';
import todoController from '../controllers/todoController';

const todoRouter = express.Router();

todoRouter.get("/", todoController.listAll);
todoRouter.get("/:id", todoController.listTodo);
todoRouter.post("/", todoController.createTodo);
todoRouter.put("/:id", todoController.updateTodo);
todoRouter.delete("/:id", todoController.deleteTodo);

export default todoRouter;