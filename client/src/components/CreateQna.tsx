import { Button, TextField } from "@mui/material";
import { qnaCreate } from "../atoms/qna";
import { useRecoilState } from "recoil";
import axios from "axios";
import "C:/Users/tx/Desktop/QNA.COM/qna-com/client/src/css files/home.css"

const CreateQna = () =>{
    const [qna,setQna] = useRecoilState(qnaCreate);
    const headers:HeadersInit = {
        "authorization": localStorage.getItem("jwtToken") || "",
        'Content-Type': 'application/json',
    }
    interface Qna{
        name:string,
        
    }
    const handleSubmit = async() =>{
        try {
            const  QnaToBeCreated:Qna = {
                name:qna
            }
            const response = await axios.post(`http://localhost:3000/api/qna/createqna`,JSON.stringify(QnaToBeCreated),{headers});
            if(response){{
                alert("Qna Created Succesfully!")
            }}
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
            <TextField className="home-textfield" variant="outlined" label="Name your QNA" onChange={(e)=>{
                setQna(e.target.value);
            }} />
            <Button className="home-add-button"  variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </>
    )
}

export default CreateQna;