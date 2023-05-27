import dotenv from 'dotenv';
import app from './app';

dotenv.config();
const PORT: number = ((process.env.PORT) || 7777) as number;
const HOST: string = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Listen to ${HOST}:${PORT}`);
});