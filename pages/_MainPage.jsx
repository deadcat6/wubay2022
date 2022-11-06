//domain.com/

import * as React from 'react';
import ItemListContainer from "./components/Product/ItemListContainer";
import FilterContainer from "./components/Product/FilterContainer";
import Grid from "@mui/material/Grid";
import {useSession} from "next-auth/react";

import {useRouter} from 'next/router'
import MainLayout from "./components/MainLayout";

const _MainPage = () => {
  const {data: session} = useSession()

  const router = useRouter();
  return (

    <MainLayout>

      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          <FilterContainer/>
        </Grid>
        <Grid item xs={9.5}>
          <ItemListContainer/>
        </Grid>
      </Grid>


    </MainLayout>
  )
}
export default _MainPage;
