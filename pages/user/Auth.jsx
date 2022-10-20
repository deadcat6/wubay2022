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
      />
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
      <Button variant="contained">Sign Up</Button>
      <a href="link_to_url" rel="noreferrer">Forgot Password?</a>
    </React.Fragment>
  )
}


