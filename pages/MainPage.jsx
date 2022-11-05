//domain.com/

import * as React from 'react';
import ItemListContainer from "./component/Product/ItemListContainer";
import FilterContainer from "./component/Product/FilterContainer";
import Grid from "@mui/material/Grid";
import {useSession} from "next-auth/react";

import {useRouter } from 'next/router'

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
          <ItemListContainer/>
        </Grid>
      </Grid>



    </React.Fragment>
  )
}
export default MainPage;
