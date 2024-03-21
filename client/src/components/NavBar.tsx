import React from "react";
//import "C:/Users/tx/Desktop/QNA.COM/qna-com/client/src/css files/home.css"

import "../css files/home.css"
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const NavBar = () => {
    const navigate = useNavigate();
    return(
        <>
            <div className="home-navbar">
                <h2 className="home-page-title">QNA.Com</h2>
                <ul>
                    <li  onClick={()=>{navigate('/signup')}}>Signup</li>
                    <li onClick={()=>{navigate('/login')}}>LogIn</li>
                    
                </ul>
            </div>
            
        </>
    )
} 

export default NavBar