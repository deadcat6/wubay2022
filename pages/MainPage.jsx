//domain.com/

import * as React from 'react';
import {useRouter} from 'next/router'
import ItemListCointainer from "../component/Product/ItemListCointainer";
import FilterContainer from "../component/Product/FilterContainer";
import Grid from "@mui/material/Grid";
import {useSession} from "next-auth/react";

const MainPage = () => {
  const {data: session} = useSession()

  const router = useRouter();
  return (
    <React.Fragment>
      {/*<Button*/}
      {/*  variant="contained"*/}
      {/*  onClick={(e) => {*/}
      {/*    e.preventDefault();*/}
      {/*    router.push('user/Auth');*/}
      {/*  }}*/}
      {/*>auth page</Button>*/}

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
