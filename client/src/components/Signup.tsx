import { TextField, Container, Grid, Typography, Button, Alert } from "@mui/material";
import { useRecoilState } from "recoil";
import { nameState, emailState, passwordState } from "../atoms/user";
import { useState } from "react";
import axios from "axios";

import SignUp_OuterBox from "./SignUp_OuterBox";
import SignUp_NavBar from "./SignUp_NavBar";

import "../css files/signup_page.css"

const Signup = () => {
    const [name, setName] = useRecoilState(nameState);
    const [email, setEmail] = useRecoilState(emailState);
    const [password, setPassword] = useRecoilState(passwordState)
    const [showAlert, setShowAlert] = useState(false);
    interface user {
        name: String,
        email: String,
        password: String
    }
    const handleSubmit = async () => {
        try {
            const User: user = {
                name: name,
                email: email,
                password: password
            }
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await axios.post('http://localhost:3000/api/auth/register', JSON.stringify(User), { headers });
            if (response) {
                console.log("succees!")
                console.log(response.data)
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
                    <SignUp_NavBar />
                    <SignUp_OuterBox />
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {showAlert && (
                                <Alert severity="success" onClose={() => setShowAlert(false)}>
                                    Signed-Up Successfully!
                                </Alert>
                            )}
                        <Grid item xs={12}>
                            <Typography style={{fontSize: '23px', fontFamily: 'Times New Roman, Times, serif'}} className="signup-title" variant="h4" align="center">
                                Signup Form
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                margin="normal"
                                required
                                onChange={(e) => { setName(e.target.value) }}
                                className="signup-name"
                                style={{width: '28%'}}

                                
                                />
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                required
                                onChange={(e) => { setEmail(e.target.value) }}
                                className="signup-email-field"
                                style={{width: '28%'}}

                                />
                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                margin="normal"
                                required
                                onChange={(e) => { setPassword(e.target.value) }}
                                className="signup-pass-field"
                                style={{width: '28%'}}

                            />
                            <Button className="signup-btn" variant="contained" color="primary" onClick={handleSubmit}>Signup</Button>
                            
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    )
}

export default Signup;