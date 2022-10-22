//domain.com/

import Button from '@mui/material/Button';
import * as React from 'react';
import {useState} from 'react';
import {Box, Container, Grid, Stack, TextField} from "@mui/material";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Login from "./Login";

import NavBar from "../../component/NavBar/NavBar";


export default function Auth() {
  const {data: session} = useSession()
  const router = useRouter();
  return (
    <React.Fragment>
      <NavBar/>
      <Login/>
    </React.Fragment>


  );
  // return (
  //   <React.Fragment>
  //     <Button
  //       variant="contained"
  //       onClick={(e) => {
  //         e.preventDefault();
  //         router.push('Login');
  //       }}
  //     >Login Form</Button>
  //     <Button
  //       variant="contained"
  //       onClick={(e) => {
  //         e.preventDefault();
  //         router.push('Signup');
  //       }}
  //     >Signup Form</Button>
  //
  //   </React.Fragment>
  // )
}