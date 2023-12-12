import { TextField, Container, Grid, Typography, Button, Alert } from "@mui/material";
import { useRecoilState } from "recoil";
import { nameState, emailState, passwordState } from "../atoms/user";
import { useState } from "react";
import axios from "axios";

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
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {showAlert && (
                                <Alert severity="success" onClose={() => setShowAlert(false)}>
                                    Signed-Up Successfully!
                                </Alert>
                            )}
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center">
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

                            />
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                required
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                margin="normal"
                                required
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <Button variant="contained" color="primary" onClick={handleSubmit}>Signup</Button>
                            
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    )
}

export default Signup;