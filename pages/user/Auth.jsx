//domain.com/

import Button from '@mui/material/Button';
import * as React from 'react';
import {useState} from 'react';
import {Box, Container, Grid, Stack, TextField} from "@mui/material";
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Login from "./Login";

import NavBar from "../../component/NavBar/NavBar";
import CreatProfile from "./CreatProfile";
import AccountPage from "./AccountPage";


export default function Auth() {
  const {data: session} = useSession()
  // const router = useRouter();
  const NeedCreateAProfile = (email) => {
    //New Use First time login
    //TODO: Michael: Create a function to check whether this is a new user (cannot query the email from the db)
    //TODO: Michael: If so, sign up this new user with only user's email.
    //TODO: Ajay: Create a api to call michael's function and respond  whether this is a new user

    const getUserInfo = async () => {

      //const {data: session} = useSession();
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(email),
        headers: {'Content-Type': 'application/json'}
      });

      const data = await res.json();
      //data.products.map(e => console.log(e))

      return !data.user_exists;
    }

    getUserInfo();
    //return true;
  }

  if (session) { // already logged in
    if (NeedCreateAProfile(session.user.email)) { //New Use First time login?
      //TODO: Tony: new user first time logged in should creat a profile, CreatProfile is just like the signup page.
      //TODO: Michael: Create a function update user's info(profile)
      //TODO: Ajay: in this CreatProfile page, Create a api to update the user's info to db.
      //TODO: Ajay: in other word CreatProfile middleware.
      return (
        <>
          <NavBar/>
          <CreatProfile/>
          <Stack spacing={2.5} alignItems="center">
                <Button
                    variant="contained"
                    sx={{
                        width: { sm: 50, md: 100 },
                        height: { sm: 30, md: 60 },
                    }}
                    onClick={() => signOut({callbackUrl: 'http://localhost:3000/user/Auth'})}
                >Sign Out</Button>
            </Stack>
        </>

      );
    } //else: it's an old user.
    return (
      <>
        <NavBar/>
        {/*TODO - Michael: read user info from db.*/}
        {/*TODO - MVP: Tony: AccountPage that display user info.*/}
        {/*TODO - MVP: Ajay: Create a api to fetch the user's info from db.*/}
        {/*TODO - Alpha: Tony: user can edit their profile.*/}
        {/*TODO - Alpha: Ajay: user can edit their profile, call a api to update the user's info from db.*/}
        <AccountPage/>
        <button onClick={() => signOut({callbackUrl: 'http://localhost:3002/user/Auth'})}>Sign out</button>
      </>
    )
  }

  return ( /* need to logged in */ <>
      <NavBar/>
      tony will make this page prettier later,
      <h1>Please log in.</h1> <br/>
        <Button
            variant="contained"
            sx={{
                width: { sm: 100, md: 200 },
                height: { sm: 30, md: 60 },
            }}
            onClick={() => signIn('google', {callbackUrl: 'http://localhost:3002/user/Auth'})}
        >Log in with Google</Button>
          </>
  )
}