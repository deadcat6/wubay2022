//domain.com/

import Button from '@mui/material/Button';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Container, Stack} from "@mui/material";
import {signIn, signOut, useSession} from "next-auth/react";


import NavBar from "../component/NavBar/NavBar";

import CreatProfile from "./CreatProfile";
import UserPageContainer from "./UserPageContainer";


export default function Auth() {
  const {data: session} = useSession()
  const [needProfile, setNeedProfile] = useState(false);
  useEffect(() => {
    async function getUserInfo(user) {
      const res = await fetch('/api/user/newUser', {
        method: 'POST',
        body: JSON.stringify({user: user}),
        headers: {'Content-Type': 'application/json'}
      });

      const data = await res.json();
      //data.products.map(e => console.log(e))
      setNeedProfile(data.needProfile);
      return data.needProfile;
    }

    if (session) {
      //console.log(session)
      getUserInfo(session.user);
    }

  }, [session]); // Or [] if effect doesn't need props or state


  if (session) { // already logged in
    if (needProfile) { //New Use First time login?
      return (
        <>
          <NavBar/>
          <h1>CreatProfile page</h1>
          <CreatProfile/>
          <Stack spacing={2.5} alignItems="center">
            <Button
              // onClick={() => signOut({callbackUrl: 'http://localhost:3000/user/Auth'})}
              onClick={() => signOut()}>Sign Out</Button>
          </Stack>
        </>
      );
    } //else: it's an old user.
    else {
      return (
        <>
          <NavBar/>
          <h1>AccountPage page</h1>
          <UserPageContainer/>

        </>
      )
    }

  }

  return ( /* need to logged in */ <>
      <NavBar/>
      <React.Fragment>
        <Container id="signup" justifyContent="left" maxWidth="sm">
          <Stack spacing={2.5} alignItems="center">
            <h2>Welcome to WUBay, the harbor where used items receives a second life.</h2>
            <h1>Please log in.</h1>
            <Button
              variant="contained"
              sx={{
                width: {sm: 100, md: 200},
                height: {sm: 30, md: 60},
              }}
              onClick={() => signIn('google')}
            >Log in with Google</Button>
          </Stack>
        </Container>
      </React.Fragment>
    </>
  )
}
