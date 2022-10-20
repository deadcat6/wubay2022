//domain.com/

import * as React from 'react';
import Auth from "./user/Auth";
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
          router.push('user/Auth');
        }}
      >auth page</Button>
    </React.Fragment>

  )
}
export default MainPage;