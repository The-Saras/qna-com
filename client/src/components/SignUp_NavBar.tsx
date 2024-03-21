import React from "react";
import { useNavigate } from "react-router-dom";


const SignUp_NavBar = () => {
    const navigate = useNavigate();
    return(
        <>
            <div className="s-navbar">
                <h2 className="s-page-title">QNA.Com</h2>
                <ul>
                    <li onClick={()=>{navigate('/signup')}}>Signup</li>
                    <li onClick={()=>{navigate('/login')}}>Login</li>
                </ul>
            </div>
            
        </>
    )
} 

export default SignUp_NavBar