import express from 'express';
import connectToMongo from './db.js';
import apiRoute from "./routes/auth.js"

const app = express();
connectToMongo();
app.use(express.json());
const port = 3000;


app.use("/api/auth",apiRoute);

app.listen(port,()=>{
    console.log("Server started on 3000 port!")
})