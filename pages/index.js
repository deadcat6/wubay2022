//domain.com/

import Head from 'next/head'
import Image from 'next/image'
import Button from '@mui/material/Button';
import * as React from 'react';
import {TextField} from "@mui/material";
import {useState} from "react";
import Auth from "./user/Auth";
import _MainPage from "./_MainPage";
import NavBar from "./components/NavBar/NavBar";
import MainPage from "./MainPage";



export default function Home() {

  return (
  <React.Fragment>
    <MainPage/>
  </React.Fragment>
  )
}
