import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import SearchBar from './SearchBar';
//import CartWidget from '../Cart/CartWidget';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {Tooltip} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Link from 'next/link';
import ChatPage from "../../chat/ChatPage";


const NavBar = () => {
  const pages = ['Desktops', 'Notebooks', 'Gadgets'];

  return (
    // <ThemeContext>
    <AppBar position='static' sx={{bgcolor: '#3e1903'}}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <h1>WUBay</h1>
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
          {/*  // component={Link}*/}
          {/*  to='/cart'*/}
          {/*>*/}
          {/*  /!*<Badge  color='error'>*!/*/}
          {/*  /!*  <ShoppingCartIcon sx={{ fontSize: 30 }} />*!/*/}
          {/*  /!*</Badge>*!/*/}
          {/*</IconButton>*/}
          <Stack direction="row" spacing={1}>
            <Tooltip title='Sell Your Product'>
              <Link href="/product/AddNewProduct" passHref>
                <IconButton size="large" color='inherit' aria-label="">
                  <PostAddIcon fontSize="inherit"/>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title='Your Messages'>
              <Link href="/chat/ChatPage" passHref>
                <IconButton size="large" color='inherit' aria-label="">
                  <NotificationsIcon fontSize="inherit"/>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title='Your Account'>
              <Link href="/user/Chat" passHref>
                <IconButton size="large" color='inherit' aria-label="">
                  <PersonIcon fontSize="inherit"/>
                </IconButton>
              </Link>

            </Tooltip>

          </Stack>
          {/*</Tooltip>*/}


          {/*<CartWidget />*/}

        </Toolbar>
      </Container>
    </AppBar>
    // </ThemeContext>
  );
};

export default NavBar;
