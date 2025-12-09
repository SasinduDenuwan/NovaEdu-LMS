import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route';
import instructorRouter from './routes/instructor.route';
import courseRouter from './routes/course.route';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI as string

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
)

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/instructor", instructorRouter)
app.use("/api/v1/course", courseRouter)

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})