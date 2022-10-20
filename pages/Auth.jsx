//domain.com/

import Head from 'next/head'
import Image from 'next/image'

import Button from '@mui/material/Button';
import * as React from 'react';
import {TextField} from "@mui/material";
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

    return (
        <React.Fragment>
            <h2>WUBay Login Page</h2>
            <TextField
                id="outlined-basic"
                label="Username"
                onChange={(v) => {
                    setUser({
                        ...user,
                        username: v.target.value,
                    })
                }}
            /><br></br>
            <TextField
                id="outlined-basic"
                label="Password"
                onChange={(v) => {
                    setUser({
                        ...user,
                        password:v.target.value,
                    })
                }}
            /><br></br><br></br>

            <Button
                variant="contained"
                onClick={(e) => {
                    e.preventDefault();
                    //console.log(user);
                    alert("username" + user.username + "  password" + user.password);
                    // sent to backend and firebase
                }}
            >Log In</Button><br></br><br></br>
            <a href="link_to_url" rel="noreferrer">Forgot Password?</a><br></br><br></br>


            <TextField
                id="outlined-basic"
                label="New Username"
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
                    //console.log(user);
                    alert("username" + register.username + "  password" + register.password + "  first name" + register.firstname+ "  last name" + register.lastname + "  email" + register.email+ "  phone" + register.phone);
                    // sent to backend and firebase
                }}
            >Sign Up</Button><br></br><br></br><br></br>

        </React.Fragment>
    )
}

