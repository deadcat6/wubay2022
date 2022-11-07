import React, {useState} from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
 
import SearchBar from './SearchBar';
//import CartWidget from '../Cart/CartWidget';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {Dialog, ThemeProvider, Tooltip} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Link from 'next/link';
import ChatPage from "../../chat/ChatPage";
import Button from "@mui/material/Button";
import {createTheme} from "@mui/material/styles";
import {useSession} from "next-auth/react";
import Login from "../Login";


const NavBar = () => {
  const pages = ['Desktops', 'Notebooks', 'Gadgets'];
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#ffffff",
  //       contrastText: "#fff" //button text white instead of black
  //     },
  //     background: {
  //       default: "#394764"
  //     }
  //   }
  // });

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

            {/*<ThemeProvider theme={theme}>*/}
              <Link href="/" passHref>
                <Button color="logo" size="medium" style={{justifyContent: "flex-start"}}><h1>WUBay</h1></Button>
              </Link>
            {/*</ThemeProvider>*/}
          {/*<Logo />*/}
          {/*<MenuNavList pages={pages} />*/}
          <Container maxWidth='xs' disableGutters>
            <SearchBar/>

          </Container>
          {/*<Tooltip title='Ver carrito'>*/}
          {/*<IconButton*/}
          {/*  sx={{ mx: 1 }}*/}
          {/*  aria-label='carrito'*/}
          {/*  size='large'*/}
          {/*  color='inherit'*/}
          {/*  // components={Link}*/}
          {/*  to='/cart'*/}
          {/*>*/}
          {/*  /!*<Badge  color='error'>*!/*/}
          {/*  /!*  <ShoppingCartIcon sx={{ fontSize: 30 }} />*!/*/}
          {/*  /!*</Badge>*!/*/}
          {/*</IconButton>*/}
          <Stack direction="row" spacing={1}>
            <Tooltip title='Sell Your Product'>
              {session ? (
                <Link href="/user/products/new" passHref>
                  <IconButton size="large" color='inherit' aria-label="">
                    <PostAddIcon fontSize="inherit"/>
                  </IconButton>
                </Link>
              ) : (
                <IconButton onClick={toggleDialog} size="large" color='inherit' aria-label="">
                  <PostAddIcon fontSize="inherit"/>
                </IconButton>
              )
              }

            </Tooltip>
            <Tooltip title='Your Messages'>
              {session ? (
                <Link href="/chat/ChatPage" passHref>
                  <IconButton size="large" color='inherit' aria-label="">
                    <NotificationsIcon fontSize="inherit"/>
                  </IconButton>
                </Link>
              ) : (
                <IconButton onClick={toggleDialog} size="large" color='inherit' aria-label="">
                  <NotificationsIcon fontSize="inherit"/>
                </IconButton>
              )
              }
            </Tooltip>
            <Tooltip title='Your Account'>
              {session ?  (
                <Link href="/user/profile" passHref>
                  <IconButton  size="large" color='inherit' aria-label="">
                    <PersonIcon fontSize="inherit"/>
                  </IconButton>
                </Link>
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
          <Login />
        </Dialog>
      </Container>
    </AppBar>
    // </ThemeContext>
  );
};

export default NavBar;
