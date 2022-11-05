//TODO: Tony: new user first time loged in should creat a profile, just like the signup page.
//TODO: Ajay: in this CreatProfile page, Create a api to update the user's info to db.

import {useSession} from "next-auth/react";
import * as React from 'react';
import {useState} from 'react';
import {Box, Container, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";

const CreatProfile = () => {
  const {data: session} = useSession()
  const [profile, setProfile] = useState({
    username: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
  });

  async function profileHandler() {
    const response = await fetch('/api/user/setProfile', {
      method: 'POST',
      body: JSON.stringify({
          userId: session.user.id,
          profile: {
            username: profile.username,
            email: profile.email,
            firstname: profile.firstname,
            lastname: profile.lastname,
            phone: profile.phone,
          }
        }
      ),
      headers: {'Content-Type': 'application/json'}
    });
  }

  if (!session) {
    return (<h1> please log in</h1>)
  }
  return (
    <React.Fragment>
      <Container id="signup" justifyContent="left" maxWidth="sm">
        <Box my={10} sx={{backgroundColor: 'white',}}>
          <Stack spacing={2.5} alignItems="center">
            <h1>hello, {session.user.email}. Please create a new profile.</h1>
            <h2>Sign Up for WUBay</h2>
            <TextField
              id="outlined-basic"
              label="New Username"
              sx={{
                width: {sm: 200, md: 300},
              }}
              onChange={(v) => {
                setProfile({
                  ...profile,
                  username: v.target.value,
                })
              }}
            />
            <TextField
              id="outlined-basic"
              label="First Name"
              sx={{
                width: {sm: 200, md: 300},
              }}
              onChange={(v) => {
                setProfile({
                  ...profile,
                  firstname: v.target.value,
                })
              }}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              sx={{
                width: {sm: 200, md: 300},
              }}
              onChange={(v) => {
                setProfile({
                  ...profile,
                  lastname: v.target.value,
                })
              }}
            />
            <TextField
              id="outlined-basic"
              label="Phone number"
              sx={{
                width: {sm: 200, md: 300},
              }}
              onChange={(v) => {
                setProfile({
                  ...profile,
                  phone: v.target.value,
                })
              }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              sx={{
                width: {sm: 200, md: 300},
              }}
              onChange={(v) => {
                setProfile({
                  ...profile,
                  password: v.target.value,
                })
              }}
            />
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              type="password"
              sx={{
                width: {sm: 200, md: 300},
              }}
              onChange={(v) => {
                setProfile({
                  ...profile,
                  confirmPassword: v.target.value,
                })
              }}
            />
            <Button
              variant="contained"
              sx={{
                width: {sm: 50, md: 100},
                height: {sm: 30, md: 60},
              }}
              onClick={(e) => {
                e.preventDefault();
                profileHandler();
                //console.log(d);
                //alert("username " + profile.username + "  password " + profile.password + "  first name " + profile.firstname + "  last name " + profile.lastname + "  email " + profile.email + "  phone " + profile.phone);
                // sent to backend and firebase
              }}
            >Sign Up</Button>
            <a href="Login" rel="noreferrer">Already part of WUBay? Log in here.</a>
          </Stack>
        </Box>
      </Container>

    </React.Fragment>
  )
}

export default CreatProfile;


