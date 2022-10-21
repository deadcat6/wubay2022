//domain.com/

import * as React from 'react';
import Auth from "./user/Login";
import Link from "next/link";
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';

 const MainPage = () => {
  const router = useRouter();
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
        <Button
            variant="contained"
            onClick={(e) => {
                e.preventDefault();
                router.push('Product');
            }}
        >Create Listing Form</Button>
    </React.Fragment>

  )
}
export default MainPage;
