//domain.com/

import Button from '@mui/material/Button';
import * as React from 'react';
import {useState} from 'react';
import {Box, Container, Grid, Stack, TextField} from "@mui/material";
import {useSession} from "next-auth/react";



export default function Auth() {
  const {data: session} = useSession()
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

  async function loginHandler(username, password) {
    //console.log("u is " + u);
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {'Content-Type': 'application/json'}


    });
    const login_data = await response.json();
    console.log(login_data)

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

      <Container id="login"  justifyContent="left" maxWidth="sm">
        {/*这个box只是让你看到container的大小*/}
        <Box my={10} sx={{backgroundColor: 'white',}}>
              <Stack spacing={2.5} alignItems="center">
                <h2>Welcome to WUBay</h2>
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
                <TextField
                  id="outlined-basic"
                  label="Password"
                  onChange={(v) => {
                    setUser({
                      ...user,
                      password: v.target.value,
                    })
                  }}
                />
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
                {/*这里不要用 a href 该用boolean*/}
                <a href="link_to_url" rel="noreferrer">No Account? Sign Up!</a>
                <a href="link_to_url" rel="noreferrer">Forgot Password?</a>
              </Stack>
        </Box>
      </Container>

      <Container id="signup" maxWidth="sm">
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
        /><br></br>
        <TextField
          id="outlined-basic"
          label="New Password"
          onChange={(v) => {
            setRegister({
              ...register,
              password: v.target.value,
            })
          }}
        /><br></br>
        <TextField
          id="outlined-basic"
          label="First Name"
          onChange={(v) => {
            setRegister({
              ...register,
              firstname: v.target.value,
            })
          }}
        /><br></br>
        <TextField
          id="outlined-basic"
          label="Last Name"
          onChange={(v) => {
            setRegister({
              ...register,
              lastname: v.target.value,
            })
          }}
        /><br></br>
        <TextField
          id="outlined-basic"
          label="Email"
          onChange={(v) => {
            setRegister({
              ...register,
              email: v.target.value,
            })
          }}
        /><br></br>
        <TextField
          id="outlined-basic"
          label="Phone number"
          onChange={(v) => {
            setRegister({
              ...register,
              phone: v.target.value,
            })
          }}
        /><br></br><br></br>

        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            signupHandler(register.username, register.password, register.firstname, register.lastname, register.email, register.phone);
            //console.log(d);
            alert("username " + register.username + "  password " + register.password + "  first name " + register.firstname + "  last name " + register.lastname + "  email " + register.email + "  phone " + register.phone);
            // sent to backend and firebase
          }}
        >Sign Up</Button><br></br><br></br><br></br>
      </Container>

    </React.Fragment>
  )
}