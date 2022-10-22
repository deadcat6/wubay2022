//domain.com/

import * as React from 'react';
import ItemListCointainer from "../component/Product/ItemListCointainer";
import FilterContainer from "../component/Product/FilterContainer";
import Grid from "@mui/material/Grid";
import {useSession} from "next-auth/react";
import Auth from "./user/Login";
import Link from "next/link";
import {useRouter } from 'next/router'
import Button from '@mui/material/Button';

const MainPage = () => {
  const {data: session} = useSession()

  const router = useRouter();
  return (
    <React.Fragment>


      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          <FilterContainer/>
        </Grid>
        <Grid item xs={9.5}>
          <ItemListCointainer/>
        </Grid>
      </Grid>



    </React.Fragment>
  )
}
export default MainPage;
