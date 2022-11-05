//domain.com/

import Head from 'next/head'
import Image from 'next/image'
import Button from '@mui/material/Button';
import * as React from 'react';
import {TextField} from "@mui/material";
import {useState} from "react";
import Auth from "./user/Auth";
import MainPage from "./MainPage";
import NavBar from "./component/NavBar/NavBar";



export default function Home() {

  return (
  <React.Fragment>
    <NavBar/>
    <MainPage/>

  </React.Fragment>

    


  )
}
