import React, {useState} from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {Dialog, Tooltip} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Link from 'next/link';
import Button from "@mui/material/Button";
import {useSession} from "next-auth/react";
import Login from "../Login";
import {useRouter} from "next/router";
import {Box} from "@mui/system";
import SearchBox from "./SearchBox"


const NavBar = () => {
  const router = useRouter();


  const {data: session} = useSession()

  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => setDialogOpen(!dialogOpen);

  return (
    // <ThemeContext>
    <AppBar position='static'
      // sx={{bgcolor: 'rgba(75,134,224,0.88)'}}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>

          {/*<Grid container>*/}
          {/*  <Grid item xs={6}>*/}
          {/*    <Link href="/" passHref>*/}
          {/*      <Button color="logo" size="medium" style={{justifyContent: "flex-start"}}><h1>WUBay</h1></Button>*/}
          {/*    </Link>*/}
          {/*  </Grid>*/}
          {/*  <Grid item xs={6}>*/}
          {/*    <SearchBar/>*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
          <Box>

          <Link href="/" passHref>
              <Button color="logo" size="medium" style={{justifyContent: "flex-start"}}><h1>WUBay</h1></Button>
          </Link>
          </Box>

          <Container maxWidth='xs' disableGutters>
            <SearchBox/>
          </Container>

          <Stack direction="row" spacing={1}>
            <Tooltip title='Sell Your Product'>
              {session ? (
                <IconButton size="large" color='inherit' aria-label="" onClick={() => {
                  router.push("/user/products/new")
                }}
                >
                  <PostAddIcon fontSize="inherit"/>
                </IconButton>
              ) : (
                <IconButton onClick={toggleDialog} size="large" color='inherit' aria-label="">
                  <PostAddIcon fontSize="inherit"/>
                </IconButton>
              )
              }

            </Tooltip>
            <Tooltip title='Your Messages'>
              {session ? (
                <IconButton size="large" color='inherit' aria-label="" onClick={() => {
                  router.push("/user/profile")
                }}
                >
                  <NotificationsIcon fontSize="inherit"/>
                </IconButton>
              ) : (
                <IconButton onClick={toggleDialog} size="large" color='inherit' aria-label="">
                  <NotificationsIcon fontSize="inherit"/>
                </IconButton>
              )
              }
            </Tooltip>
            <Tooltip title='Your Account'>
              {session ? (
                  <IconButton size="large" color='inherit' aria-label="" onClick={() => {
                    router.push("/user/profile")
                  }}>
                    <PersonIcon fontSize="inherit"/>
                  </IconButton>
              ) : (
                <IconButton onClick={toggleDialog} size="large" color='inherit' aria-label="">
                  <PersonIcon fontSize="inherit"/>
                </IconButton>
              )

              }


            </Tooltip>

          </Stack>
          {/*</Tooltip>*/}


          {/*<CartWidget />*/}

        </Toolbar>
        <Dialog
          open={dialogOpen}
          //fullWidth={isMobile}
          scroll="body"
          onClose={toggleDialog}
        >
          <Login/>
        </Dialog>
      </Container>
    </AppBar>
    // </ThemeContext>
  );
};

export default NavBar;
