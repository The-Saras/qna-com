import CreateQna from "./CreateQna"
import Qna from "./Qna"
import QnaState from "./QnaState"
import NavBar from "./NavBar"
import { useEffect, useState } from "react"
import axios from "axios"
import { Typography } from "@mui/material"
const Home = () =>{
    const [name,setname] = useState("")
    async function fetchname(){
        const headers:HeadersInit = {
            "authorization": localStorage.getItem("jwtToken") || "",
            'Content-Type': 'application/json',
        }
        const response = await axios.get("http://localhost:3000/api/auth/me",{headers}) 
        console.log(response.data.name)
        setname(response.data.name);
    }
    useEffect(()=>{

        fetchname();
    
    },[])
    if(name){
        return(
            <>
            <NavBar />
            <CreateQna />
            <QnaState />
            </>
        )
    }
    if(!name){
        return(

            <>
        <NavBar />
        <br></br>
        <Typography variant="h3" align="center">Please signup to continue</Typography>
        </>
        )
    }
    
}

export default Home