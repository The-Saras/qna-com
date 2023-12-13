import {  useRecoilState } from "recoil"
import { qnaItems } from "../atoms/qna"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Qna from "./Qna"

const QnaState = () =>{
    const [qna,setQna] = useRecoilState(qnaItems)
    const [loading, setLoading] = useState(true);
    
    const headers:HeadersInit = {
        "authorization": localStorage.getItem("jwtToken") || "",
        'Content-Type': 'application/json',
    }
    const fetchAllQnas = async () =>{
        try {
            const response = await axios.get("http://localhost:3000/api/qna/allqna",{headers});
            
            //console.log(response.data.allQnas);
            setQna(response.data.allQnas);
            setLoading(false);
            console.log(qna)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        fetchAllQnas();
    }, []);
    return(
        <>
        
        {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {qna.map((value: any) => (
            
            <span key={value._id}>

              <Qna name={value.name} creator={value.createdBy.name} _id={value._id} />
              <br />
            
            </span>
          ))}
        </>
      )}
        </>
    )
}

export default QnaState