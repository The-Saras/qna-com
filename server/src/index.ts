import express from 'express';
import connectToMongo from './db.js';
import apiRoute from "./routes/auth.js"
import qnaRoutes from "./routes/qna.js"
import cors from 'cors';
const app = express();
connectToMongo();
app.use(express.json());

app.use(cors());
const port = 3000;


app.use("/api/auth",apiRoute);
app.use("/api/qna",qnaRoutes)

app.listen(port,()=>{
    console.log("Server started on 3000 port!")
})