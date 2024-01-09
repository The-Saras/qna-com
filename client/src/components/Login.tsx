import { TextField, Container, Grid, Typography, Button, Alert } from "@mui/material";
import { useRecoilState } from "recoil";
import {  emailState, passwordState } from "../atoms/user";
import { useState } from "react";
import axios from "axios";

import Login_NavBar from "./Login_NavBar";
import Login_OuterBox from "./Login_OuterBox";
import "C:/Users/tx/Desktop/QNA.COM/qna-com/client/src/css files/login_page.css"



const Login = () => {
   
    const [email, setEmail] = useRecoilState(emailState);
    const [password, setPassword] = useRecoilState(passwordState)
    const [showAlert, setShowAlert] = useState(false);
    interface user {
        
        email: String,
        password: String
    }
    const handleSubmit = async () => {
        try {
            const User: user = {
                
                email: email,
                password: password
            }
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await axios.post('http://localhost:3000/api/auth/login', JSON.stringify(User), { headers });
            if (response) {
                console.log("succees!")
                console.log(response.data.authToken)
                localStorage.setItem('jwtToken', response.data.authToken);
                setShowAlert(true);
            }
        }
        catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <div>
                <Container>
                    <Login_NavBar />
                    <Login_OuterBox />
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {showAlert && (
                                <Alert severity="success" onClose={() => setShowAlert(false)}>
                                    Logged-in Successfully!
                                </Alert>
                            )}
                        <Grid item xs={12}>
                            <Typography style={{fontSize: '23px', fontFamily: 'Times New Roman, Times, serif'}} className="login-title" variant="h4" align="center">
                               Login Form
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                required
                                onChange={(e) => { setEmail(e.target.value) }}
                                className="login-email-field"
                                style={{width: '28%'}}
                                />
                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                margin="normal"
                                required
                                onChange={(e) => { setPassword(e.target.value) }}
                                className="login-pass-field"
                                style={{width: '28%'}}
                            />
                            <Button className="login-btn" variant="contained" color="primary" onClick={handleSubmit}>Signup</Button>
                            
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    )
}

export default Login;