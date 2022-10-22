//domain.com/

import Button from '@mui/material/Button';
import * as React from 'react';
import {useState} from 'react';
import {Box, Container, Grid, Stack, TextField} from "@mui/material";
import {useSession} from "next-auth/react";



export default function Auth() {
  const {data: session} = useSession()

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          router.push('user/Login');
        }}
      >Login Form</Button>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          router.push('user/Signup');
        }}
      >Signup Form</Button>

    </React.Fragment>
  )
}