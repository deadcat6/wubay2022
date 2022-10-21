//domain.com/

import Head from 'next/head'
import Image from 'next/image'

import Button from '@mui/material/Button';
import * as React from 'react';
import {Box, Container, Grid, Paper, Stack, styled, TextField} from "@mui/material";
import {useState} from "react";

    const styles = theme => ({
    textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    input: {
        color: 'white'
    }
    });

export default function Auth() {

    //Const for User Login
    const [user, setUser] = useState({
        username: '',
        password: '',
    });


    //Const for User Sign Up
    const [register, setRegister] = useState({
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        phone: ''
    });

    async function signupHandler(username, password, firstname, lastname, email, phone){
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
            headers: {'Content-Type' : 'application/json'}
   
   
        });
        const signup_data = await response.json();
        
        
    }

    async function loginHandler(username, password){
        //console.log("u is " + u);
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type' : 'application/json'}
   
   
        });
        const login_data = await response.json();
        
        
    }

    // const Item = styled(Paper)(({ theme }) => ({
    //     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //     ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // }));

    return (
        <React.Fragment>

            <Container id = "login" >
                <Box sx={{width: 600}}justifyContent="center"
                >
                    <Grid container
                          spacing={0}
                          direction="column"
                          style={{ minHeight: '100vh'}}

                          alignItems="center">
                        <Grid item xs={12}>
                            <h2>Login to WUBay</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack>
                                <TextField
                                    id="outlined-basic"
                                    label="Username"
                                    onChange={(v) => {
                                        setUser({
                                            ...user,
                                            username: v.target.value,
                                        })
                                    }}
                                />
                            </Stack>

                        </Grid>



                                <TextField
                                    id="outlined-basic"
                                    label="Password"
                                    onChange={(v) => {
                                        setUser({
                                            ...user,
                                            password:v.target.value,
                                        })
                                    }}
                                /><br></br>

                                <Button
                                    variant="contained"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        //console.log(user);
                                        loginHandler(user.username, user.password);
                                        alert("username" + user.username + "  password" + user.password);
                                        // sent to backend and firebase
                                    }}
                                >Log In</Button>

                                <a href="link_to_url" rel="noreferrer">No Account? Sign Up!</a><br></br>



                        </Grid>


                    <a href="link_to_url" rel="noreferrer">Forgot Password?</a><br></br><br></br>
                </Box>

            </Container>

            <Container id="signup"  maxWidth="sm">
                <TextField
                    id="outlined-basic"
                    label="New Username"
                    visibility='hidden'
                    onChange={(v) => {
                        setRegister({
                            ...register,
                            username:v.target.value,
                        })
                    }}
                /><br></br>
                <TextField
                    id="outlined-basic"
                    label="New Password"
                    onChange={(v) => {
                        setRegister({
                            ...register,
                            password:v.target.value,
                        })
                    }}
                /><br></br>
                <TextField
                    id="outlined-basic"
                    label="First Name"
                    onChange={(v) => {
                        setRegister({
                            ...register,
                            firstname:v.target.value,
                        })
                    }}
                /><br></br>
                <TextField
                    id="outlined-basic"
                    label="Last Name"
                    onChange={(v) => {
                        setRegister({
                            ...register,
                            lastname:v.target.value,
                        })
                    }}
                /><br></br>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    onChange={(v) => {
                        setRegister({
                            ...register,
                            email:v.target.value,
                        })
                    }}
                /><br></br>
                <TextField
                    id="outlined-basic"
                    label="Phone number"
                    onChange={(v) => {
                        setRegister({
                            ...register,
                            phone:v.target.value,
                        })
                    }}
                /><br></br><br></br>

                <Button
                    variant="contained"
                    onClick={(e) => {
                        e.preventDefault();
                        signupHandler(register.username, register.password, register.firstname, register.lastname, register.email, register.phone );
                        //console.log(d);
                        alert("username " + register.username + "  password " + register.password + "  first name " + register.firstname+ "  last name " + register.lastname + "  email " + register.email+ "  phone " + register.phone);
                        // sent to backend and firebase
                    }}
                >Sign Up</Button><br></br><br></br><br></br>
            </Container>

        </React.Fragment>
    )
}