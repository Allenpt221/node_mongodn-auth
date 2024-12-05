import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/DB.js';
import authRouter from './routers/auth.route.js';

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server is ready!");
});

app.use("/", authRouter);

app.listen(PORT, () =>{
    console.log("Server is ready at http://localhost:" + PORT);
    connectDB();
});

