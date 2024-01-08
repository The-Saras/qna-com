import express from 'express';
import connectToMongo from './db.js';
import apiRoute from "./routes/auth.js";
import qnaRoutes from "./routes/qna.js";
import cors from 'cors';
import http from "http";
const app = express();
const server = http.createServer(app);
import { Server as SocketIOServer } from "socket.io";
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-type"],
};
const io = new SocketIOServer(server, { cors: corsOptions });
/*const io = require("socket.io")(http,{
  cors:{
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT'],
    allowedHeaders :["Content-type"]
  }
})*/
connectToMongo();
app.use(express.json());
app.use(cors());
const port = 3000;
app.use("/api/auth", apiRoute);
app.use("/api/qna", qnaRoutes);
/*io.on('connection',(socket:Socket)=>{
    console.log("Connected");
    const questionChangeStream = QuesstionModel.watch();
    questionChangeStream.on('change',(change:any)=>{
        if(change.operationType === 'insert'){
            io.emit('newQuestion',change.fullDocument);
        }
    });

    
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    questionChangeStream.close();
  });
})*/
io.on("connect", (socket) => {
    socket.on("new-que", (newquestion) => {
        //socket.broadcast.emit("que-rec",newquestion);
        console.log(newquestion);
        socket.broadcast.emit('new-que', newquestion);
    });
});
server.listen(port, () => {
    console.log("Server started on 3000 port!");
});
//# sourceMappingURL=index.js.map