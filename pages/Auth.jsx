//domain.com/

import Head from 'next/head'
import Image from 'next/image'

import Button from '@mui/material/Button';
import * as React from 'react';
import {TextField} from "@mui/material";
import {useState} from "react";
export default function Auth() {

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const [register, registerUser] = useState({
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        phone: ''
    });

    return (
        <React.Fragment>
            <h2>WUBay Login Page</h2>
            <TextField
                id="outlined-basic"
                label="username"
                onChange={(v) => {
                    setUser({
                        ...user,
                        username: v.target.value,
                    })
                }}
            /> <br></br>
            <TextField
                id="outlined-basic"
                label="password"
                onChange={(v) => {
                    setUser({
                        ...user,
                        password:v.target.value,
                    })
                }}
            />

            <Button
                variant="contained"
                onClick={(e) => {
                    e.preventDefault();
                    //console.log(user);
                    alert("username" + user.username + "  password" + user.password);
                    // sent to backend and firebase
                }}
            >Login</Button>

            
           
            <TextField
                id="outlined-basic"
                label="username"
                onChange={(v) => {
                    registerUser({
                        ...register,
                        username: v.target.value,
                    })
                }}
            />
            <TextField
                id="outlined-basic"
                label="password"
                onChange={(v) => {
                    registerUser({
                        ...register,
                        password: v.target.value,
                    })
                }}
            />
            <TextField
                id="outlined-basic"
                label="email"
                onChange={(v) => {
                    registerUser({
                        ...register,
                        email: v.target.value,
                    })
                }}
            />
            <TextField
                id="outlined-basic"
                label="First name"
                onChange={(v) => {
                    registerUser({
                        ...register,
                        firstname: v.target.value,
                    })
                }}
            />
            <TextField
                id="outlined-basic"
                label="Last name"
                onChange={(v) => {
                    registerUser({
                        ...register,
                        lastname: v.target.value,
                    })
                }}
            />
            <TextField
                id="outlined-basic"
                label="Phone number"
                onChange={(v) => {
                    registerUser({
                        ...register,
                        phone: v.target.value,
                    })
                }}
            />
            <br></br>
            <Button
                variant="contained"
                onClick={(e) => {
                    e.preventDefault();
                    //console.log(user);
                    alert("username" + register.username + "  password" + register.password+ "  first name" + register.firstname + "  lastname" + register.lastname + "  phone" + register.phone + "  email" + register.email);
                    // sent to backend and firebase
                }}
            >Sign Up</Button>
            <a href="link_to_url" rel="noreferrer">Forgot Password?</a>
        </React.Fragment>
    )
}
