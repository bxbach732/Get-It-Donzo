import express from 'express';
import authController from '../controllers/authController';

const authRouter = express.Router();

authRouter.post("/", authController.userLogin);

export default authRouter;