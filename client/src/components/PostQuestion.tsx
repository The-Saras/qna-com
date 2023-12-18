import { Button, TextField } from "@mui/material"
import { Box } from "@mui/material"
import { useRecoilState } from "recoil"
import { questiontoask } from "../atoms/qna"
import axios from "axios"

import { useState } from "react"
import {Alert} from "@mui/material"
import io from 'socket.io-client';

const socket = io('http://localhost:3000',{
    reconnection:true
})
const PostQuestion = (props:any) => {
    const [que,addQue] = useRecoilState(questiontoask);
    const [loading,setLoading] = useState(false)
    
    const headers:HeadersInit = {
        "authorization": localStorage.getItem("jwtToken") || "",
        'Content-Type': 'application/json',
    }
    interface questiontoask {
        text:string
    }
    
    
    const submitQuestion =async () =>{
        const id = props.location
        try {
            const Questiontoask:questiontoask = {
                text:que
            }
            
            const response = await axios.post(`http://localhost:3000/api/qna/createque/${id}`,JSON.stringify(Questiontoask),{headers});
            if(response){
                
                setLoading(true);
                socket.emit('new-que', response.data)
                console.log(response)
               
            }
            
             
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                
            >
                {loading && (
                                <Alert severity="info" onClose={() => setLoading(false)}>
                                    Question posted Successfully!
                                </Alert>
                )}

                <TextField label='Ask Question' variant="outlined" onChange={(e)=>{
                    addQue(e.target.value);
                }} />
                <br />
                <Button variant="contained" size="large" color="success" onClick={submitQuestion} >Ask </Button>
            </Box>
        </> 
    )
}

export default PostQuestion