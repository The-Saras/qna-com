import React from "react";
import { useNavigate } from "react-router-dom";

const Login_NavBar = () => {
    const navigate = useNavigate()
    return(
        <>
            <div className="login-navbar">
                <h2 className="login-page-title">QNA.Com</h2>
                <ul>
                <li onClick={()=>{navigate('/signup')}}>Signup</li>
                    <li onClick={()=>{navigate('/login')}}>Login</li>
                </ul>
            </div>
            
        </>
    )
} 

export default Login_NavBar