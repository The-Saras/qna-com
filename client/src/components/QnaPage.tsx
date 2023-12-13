import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { questions } from "../atoms/qna";
import { useRecoilState } from "recoil";
import SingleQuestion from "./SingleQuestion";
import PostQuestion from "./PostQuestion";
const QnaPage = () =>{
    const {qnaid} = useParams();
    const [question,setQuestions] = useRecoilState(questions);
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
    },[])
    
    return(
        <>
        <PostQuestion location={qnaid}/>
            {question.map((value:any)=>{
                return(
                    <span key={value._id}>
                    <SingleQuestion text={value.text} />
                    
                    </span>
                )
            })}
        </>
    )
}

export default QnaPage;
