//domain.com/user/login

import Button from '@mui/material/Button';
import * as React from 'react';
import {useState} from 'react';
import {Box, Container, Grid, Stack, TextField} from "@mui/material";


export default function Signup() {
    //Const for User Sign Up
    const [register, setRegister] = useState({
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        phone: ''
    });

    async function signupHandler(username, password, firstname, lastname, email, phone) {
        //console.log("u is " + u);
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                firstname,
                lastname,
                email,
                phone
            }),
            headers: {'Content-Type': 'application/json'}


        });
        const signup_data = await response.json();
    }

    return (
        <React.Fragment>


            <Container id="signup"  justifyContent="left" maxWidth="sm">
                {/*这个box只是让你看到container的大小*/}
                <Box my={10} sx={{backgroundColor: 'white',}}>
                    <Stack spacing={2.5} alignItems="center">
                        <h2>Sign Up for WUBay</h2>
                        <TextField
                            id="outlined-basic"
                            label="New Username"
                            visibility='hidden'
                            onChange={(v) => {
                                setRegister({
                                    ...register,
                                    username: v.target.value,
                                })
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="New Password"
                            onChange={(v) => {
                                setRegister({
                                    ...register,
                                    password: v.target.value,
                                })
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="First Name"
                            onChange={(v) => {
                                setRegister({
                                    ...register,
                                    firstname: v.target.value,
                                })
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Last Name"
                            onChange={(v) => {
                                setRegister({
                                    ...register,
                                    lastname: v.target.value,
                                })
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            onChange={(v) => {
                                setRegister({
                                    ...register,
                                    email: v.target.value,
                                })
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Phone number"
                            onChange={(v) => {
                                setRegister({
                                    ...register,
                                    phone: v.target.value,
                                })
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={(e) => {
                                e.preventDefault();
                                signupHandler(register.username, register.password, register.firstname, register.lastname, register.email, register.phone);
                                //console.log(d);
                                alert("username " + register.username + "  password " + register.password + "  first name " + register.firstname + "  last name " + register.lastname + "  email " + register.email + "  phone " + register.phone);
                                // sent to backend and firebase
                            }}
                        >Sign Up</Button>
                        {/*这里不要用 a href 该用boolean*/}
                        <a href="Login" rel="noreferrer">Already part of WUBay? Log in here.</a>
                    </Stack>
                </Box>
            </Container>

        </React.Fragment>
    )
}