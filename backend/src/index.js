import userRouter from './routes/userRoutes.js';
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import accountRouter from './routes/accountRoutes.js';
dotenv.config();

const PORT = process.env.PORT || 3000;
connectDB();
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || "*"
})); 
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/user/account', accountRouter);


app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})