import express from 'express';
import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.get("/", userController.listAll);
userRouter.get("/:id", userController.listUser);
userRouter.get("/:id/todos", userController.listTodosByUser);
userRouter.post("/", userController.createUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;