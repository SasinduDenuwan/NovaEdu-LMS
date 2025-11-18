import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI as string

const app = express();

app.use(express.json());
app.use(
    cors({

    })
)