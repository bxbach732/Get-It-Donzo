import { Response, Request, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const getTokenFrom = (req: Request) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '');
    }
    return null;
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authToken = getTokenFrom(req);
    const secret = process.env.SECRET || 'DEFAULT_SECRET';
    if (!authToken) {
        return res.status(401).json({ error: 'token invalid' });
    } else {
        const decodedToken = jwt.verify(authToken, secret);
    
        if (typeof decodedToken === 'string' || !decodedToken.id) {
            res.status(401).json({ error: 'token invalid' });
        } else {
            return next();
        }
    }
};

export default authMiddleware