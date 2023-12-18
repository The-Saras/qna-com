import { Typography,Card,CardContent } from "@mui/material";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import axios from "axios";
import { useState } from "react";

const SingleQuestion = (props:any)=>{
    const clckLimit = 1;
    const [clickcount,setClickcount] = useState(0);
    const headers:HeadersInit = {
        "authorization": localStorage.getItem("jwtToken") || "",
        'Content-Type': 'application/json',
    }
    const upvote =async () =>{
        try{
            const id = props.location
            if(clickcount<clckLimit){

                const response = await axios.put(`http://localhost:3000/api/qna/upvote/${id}`,{},{headers});
                setClickcount(clickcount +1)
            }
            
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <>
        <Card variant="outlined" sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>

        <Typography component="div" variant="h6">Question: {props.text}</Typography>
        <br></br>
        <button disabled={clickcount >=clckLimit}>

        <ArrowCircleUpIcon color="success" onClick={upvote}  />
        </button>
        
        
        </CardContent>
        </Card>
        </>
    )
}

export default SingleQuestion