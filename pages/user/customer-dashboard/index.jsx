import { Container, Grid } from "@mui/material";
import React from "react";
import Navigations from "./Navigations";
import MainLayout from "../../components/MainLayout";


const CustomerDashboardLayout = ({ children }) => (
  <MainLayout>
    <Container
      sx={{
        my: "2rem",
      }}
    >
      <Grid container spacing={3}>
        <Grid
          item
          lg={3}
          xs={12}
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "block",
            },
          }}
        >
          <Navigations/>
        </Grid>

        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </MainLayout>
);

export default CustomerDashboardLayout;
