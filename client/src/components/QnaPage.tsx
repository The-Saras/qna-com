import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { Typography } from "@mui/material";
import { questions } from "../atoms/qna";
import { useRecoilState } from "recoil";
import SingleQuestion from "./SingleQuestion";
import PostQuestion from "./PostQuestion";
import * as io from "socket.io-client";
const socket = io.connect('http://localhost:3000',{
    reconnection:true
})
type Question = {
    _id:string
    text: string;
};
const QnaPage = () =>{
    const {qnaid} = useParams();
    const [question,setQuestions] = useRecoilState<Question[]>(questions);
    const [newquestions,setNewquestions] = useState<Question[]>(question);
    const [newQ,setnewqu] = useState([]);
    
    const headers:HeadersInit = {
        "authorization": localStorage.getItem("jwtToken") || "",
        'Content-Type': 'application/json',
    }
    const fetchQnaData = async() =>{
        
        try {
            
            const response = await axios.get(`http://localhost:3000/api/qna/getallque/${qnaid}`,{headers});
            console.log(response.data.QuestionsInArray.questions);
            setQuestions(response.data.QuestionsInArray.questions)    
        } 
        catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchQnaData()
        socket.on('new-que',(newpost:Question)=>{
            //setnewqu(prevque=>[...prevque ,newpost]);
            setQuestions((state)=>[...state,newpost]);
        })
    },[question])
    const renderQue = question.concat(newQ);
    const collection = newquestions.length > 0 ?newquestions:question
    console.log(collection)
    return(
        <>
        
        <PostQuestion location={qnaid}/>
            { question.map((value:any)=>{
                return(
                    <span key={value._id}>
                    <SingleQuestion text={value.text} location={value._id}/>
                    
                    </span>
                )
            })}
        </>
    )
}

export default QnaPage;
