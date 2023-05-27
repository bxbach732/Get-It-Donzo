import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response, Request} from 'express';
import bcrypt from 'bcrypt';
import db from '../db/database';

dotenv.config();

const userLogin = async (req: Request, res: Response) => {
    const { email , password } = req.body;
    const secret = process.env.SECRET || 'default_secret';
    const user = (await db.raw(`
        SELECT * FROM users WHERE email = ?;`, 
        email
    )).rows[0];

    console.log(user);

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid email or password'
        });
    }

    const userForToken = {
        email: user.email,
        id: user.id,
    };

    const token = jwt.sign(userForToken, secret);

    return res.status(200).send({ token, email: user.email, name: user.name });
};

export default {
    userLogin
};