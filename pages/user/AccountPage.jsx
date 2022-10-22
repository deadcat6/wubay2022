import {useSession} from "next-auth/react";
import Button from '@mui/material/Button';
import * as React from 'react';
import {useState} from 'react';
import {Box, Container, FormControl, Grid, InputLabel, NativeSelect, Stack, TextField} from "@mui/material";

const styles = theme => ({
  textField: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500
  },
  input: {
    color: 'white'
  }
});
{/*TODO: Tony: AccountPage that display user info. DONE*/}
{/*TODO: Ajay: Create a api to fetch the user's info from db using user's email.*/}
const AccountPage = () => {
  const {data: session} = useSession()

  return (
      <React.Fragment>

        <Container id="login"  justifyContent="left" maxWidth="sm">
          <h1>Hello, test {/*{session.user.email}*/} </h1>
          <Stack spacing={2.5} alignItems="center">
            <Grid container>
              <Grid item container direction="row">
                <Grid item xs={12} sm={6}>
                  <Stack spacing={3.5} alignItems="center">
                    <Box
                        component="img"
                        sx={{ borderRadius: '50%' }}
                        style={{ maxWidth: "50%" }}
                        alt="Avatar"
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                    />
                    <TextField
                        id="standard-basic"
                        label="Username"
                        disabled={true}
                        variant="standard"
                        sx={{
                          width: { sm: 200, md: 300 },
                        }}
                        onChange={(v) => {

                        }}
                    />
                    <Grid container>
                      <Grid item container direction="row">
                        <Grid item xs={12} sm={6}>
                          <TextField
                              id="standard-basic"
                              label="First name"
                              disabled={true}
                              variant="standard"

                              onChange={(v) => {

                              }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                              id="standard-basic"
                              label="Last Name"
                              disabled={true}
                              variant="standard"

                              onChange={(v) => {

                              }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <TextField
                        id="standard-basic"
                        label="Reserved"
                        disabled={true}
                        variant="standard"
                        sx={{
                          width: { sm: 200, md: 300 },
                        }}
                        onChange={(v) => {

                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                          width: { sm: 50, md: 100 },
                          height: { sm: 30, md: 60 },
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          // Edit mode
                        }}
                    >Edit Profile</Button>
                    <Button
                        variant="contained"
                        component="label"
                    >
                      Change Avatar
                      <input
                          type="file"
                          hidden
                      />
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={2.5} alignItems="center">
                    <TextField
                        multiline={true}
                        rows={3}
                        style={{ marginLeft:"20%", maxWidth: "100%" }}
                        sx={{
                          width: { sm: 400, md: 500 },
                        }}
                        id="outlined-basic"
                        label="Product 1"
                    />
                    <TextField
                        multiline={true}
                        rows={3}
                        style={{ marginLeft:"20%", maxWidth: "100%" }}
                        sx={{
                          width: { sm: 400, md: 500 },
                        }}
                        id="outlined-basic"
                        label="Product 2"
                    />
                    <TextField
                        multiline={true}
                        rows={3}
                        style={{ marginLeft:"20%", maxWidth: "100%" }}
                        sx={{
                          width: { sm: 400, md: 500 },
                        }}
                        id="outlined-basic"
                        label="Product 3"
                    />
                    <TextField
                        multiline={true}
                        rows={3}
                        style={{ marginLeft:"20%", maxWidth: "100%" }}
                        sx={{
                          width: { sm: 400, md: 500 },
                        }}
                        id="outlined-basic"
                        label="Product 4"
                    />
                  </Stack>

                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </React.Fragment>


  )
}

export default AccountPage;