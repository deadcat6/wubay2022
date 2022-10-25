//TODO: Tony: new user first time loged in should creat a profile, just like the signup page.
//TODO: Ajay: in this CreatProfile page, Create a api to update the user's info to db.

import {useSession} from "next-auth/react";
import {useState} from 'react';
import * as React from 'react';
import {Box, Container, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";

const CreatProfile = () => {
  const {data: session} = useSession()
  const [register, setRegister] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    rating: '',
    postedProducts: [], // postedProducts: [Product]: the products user posted but no one has bought yet.
    BuyerTransactions: [], // BuyerTransactions:[Transactions]: the products user bought like {orders}.
    sellerTransactions: [], //sellerTransactions:[Transactions] the products user sold.
    usersChats: [], //usersChats: [Chats]
  });

  async function profileHandler(username, password, firstname, lastname, email, phone) {
    //console.log("u is " + u);
    const response = await fetch('/api/create_profile_info', {
      method: 'POST',
      body: JSON.stringify({

          username: username,
          password: password,
          confirmPassword: firstname,
          email: email,
          firstname: firstname,
          lastname: lastname,
          phone: phone,
          rating: '',
          postedProducts: [], // postedProducts: [Product]: the products user posted but no one has bought yet.
          BuyerTransactions: [], // BuyerTransactions:[Transactions]: the products user bought like {orders}.
          sellerTransactions: [], //sellerTransactions:[Transactions] the products user sold.
          usersChats: [] //usersChats: [Chats]
        }
      ),
      headers: {'Content-Type': 'application/json'}


    });
    const signup_data = await response.json();
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
                width: { sm: 200, md: 300 },
              }}
              onChange={(v) => {
                setRegister({
                  ...register,
                  username: v.target.value,
                })
              }}
            />
            <TextField
              id="outlined-basic"
              label="First Name"
              sx={{
                width: { sm: 200, md: 300 },
              }}
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
              sx={{
                width: { sm: 200, md: 300 },
              }}
              onChange={(v) => {
                setRegister({
                  ...register,
                  lastname: v.target.value,
                })
              }}
            />
            <TextField
              id="outlined-basic"
              label="Phone number"
              sx={{
                width: { sm: 200, md: 300 },
              }}
              onChange={(v) => {
                setRegister({
                  ...register,
                  phone: v.target.value,
                })
              }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              sx={{
                width: { sm: 200, md: 300 },
              }}
              onChange={(v) => {
                setRegister({
                  ...register,
                  password: v.target.value,
                })
              }}
            />
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              sx={{
                width: { sm: 200, md: 300 },
              }}
              onChange={(v) => {
                setRegister({
                  ...register,
                  confirmPassword: v.target.value,
                })
              }}
            />
            <Button
              variant="contained"
              sx={{
                width: { sm: 50, md: 100 },
                height: { sm: 30, md: 60 },
              }}
              onClick={(e) => {
                e.preventDefault();
                profileHandler(register.username, register.password, register.firstname, register.lastname, register.email, register.phone);
                //console.log(d);
                alert("username " + register.username + "  password " + register.password + "  first name " + register.firstname + "  last name " + register.lastname + "  email " + register.email + "  phone " + register.phone);
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


