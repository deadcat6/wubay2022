import { useRouter } from 'next/router';

//domain,com/product/

import Button from '@mui/material/Button';
import * as React from 'react';
import {useState} from 'react';
import {Box, Container, Rating, Stack, TextField, Tooltip, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {blue} from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function Product() {
    let starvalue = 5;
    let price = "$0.99";
    let methodPayment = 1;
    let paymentIcon = ["","https://filehandler.revlocal.com/600851","https://1000logos.net/wp-content/uploads/2021/12/Venmo-Logo.png", "https://www.logo.wine/a/logo/Cash_App/Cash_App-Logo.wine.svg","https://cdn-icons-png.flaticon.com/512/2489/2489756.png"];
    const theme = useTheme();
    //Set props for product



    return (
        <React.Fragment>
            <Container id="Product"  justifyContent="left"  spacing={2}>
                <Grid container>
                    <Grid item container direction="row">
                        <Grid item xs={6} sm={6}>
                            <Stack spacing={1.2} >
                                <Box
                                    component="img"
                                    sx={{  }}
                                    style={{ maxWidth: "85%", maxHeight: "85%" }}
                                    alt="Avatar"
                                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                                />
                                <Grid container spacing={2}>
                                    <Grid item container direction="row">
                                        <Grid item xs={2.5}>
                                            <Box
                                                component="img"
                                                sx={{  }}
                                                style={{ maxWidth: "90%", maxHeight: "90%" }}
                                                alt="Avatar"
                                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                                            />
                                        </Grid>
                                        <Grid item xs={2.5}>
                                            <Box
                                                component="img"
                                                sx={{  }}
                                                style={{ maxWidth: "90%", maxHeight: "90%" }}
                                                alt="Avatar"
                                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                                            />
                                        </Grid>
                                        <Grid item xs={2.5}>
                                            <Box
                                                component="img"
                                                sx={{  }}
                                                style={{ maxWidth: "90%", maxHeight: "90%" }}
                                                alt="Avatar"
                                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                                            />
                                        </Grid>
                                        <Grid item xs={2.5}>
                                            <Box
                                                component="img"
                                                sx={{  }}
                                                style={{ maxWidth: "90%", maxHeight: "90%" }}
                                                alt="Avatar"
                                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} >
                                    <Card sx={{ display: 'flex', width: 0.8 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Grid item container direction="row">
                                                    <Grid item xs={6.5}>
                                                        <Typography component="legend">Sold By</Typography>
                                                        <a href="seller page" rel="noreferrer">Seller name</a>
                                                    </Grid>
                                                    <Grid item xs={2.4}>
                                                        <Typography component="legend">Rating</Typography>
                                                        <Rating name="Seller Rating" value={starvalue} readOnly />
                                                    </Grid>
                                                    <Grid item xs={3.5}>
                                                        <Tooltip title='Your Messages'>
                                                            <Link href="/chat/ChatPage" passHref>
                                                                <IconButton size="large" color='inherit' aria-label="">
                                                                    <NotificationsIcon fontSize="inherit"/>
                                                                </IconButton>
                                                            </Link>
                                                        </Tooltip>
                                                    </Grid>
                                                    <Grid item xs={3.5}>
                                                        <Tooltip title='Your Wishlist'>
                                                            <Link href="/chat/ChatPage" passHref>
                                                                <IconButton size="large" color='inherit' aria-label="">
                                                                    <NotificationsIcon fontSize="inherit"/>
                                                                </IconButton>
                                                            </Link>
                                                        </Tooltip>
                                                    </Grid>
                                                    <Grid item xs={3.5}>
                                                        <Tooltip title='Your Wishlist'>
                                                            <Link href="/chat/ChatPage" passHref>
                                                                <IconButton size="large" color='inherit' aria-label="">
                                                                    <NotificationsIcon fontSize="inherit"/>
                                                                </IconButton>
                                                            </Link>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>

                                            </CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Stack spacing={2.5} alignItems="center">
                                <Typography variant={"h3"}>Product name</Typography>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <Card sx={{ display: 'flex' , width: 0.8}}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto', }}>
                                            <Grid container>
                                                <Grid item container direction="row">

                                                    <Grid item xs={4} md={4}>
                                                        <Typography component="div" variant="h5">
                                                            Price
                                                        </Typography>
                                                        <Typography variant="h6" color="text.primary" component="div">
                                                            {price}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4} md={4}>
                                                        <Box
                                                            component="img"
                                                            sx={{  }}
                                                            style={{ maxWidth: "85%", maxHeight: "85%" }}
                                                            alt="Payment method"
                                                            src= {paymentIcon[methodPayment]}
                                                        />

                                                    </Grid>
                                                    <Grid item xs={4} md={4}>
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                width: { sm: 50, md: 100 },
                                                                height: { sm: 30, md: 60 },
                                                            }}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                //PurchaseHandler
                                                            }}
                                                        >Purchase Now</Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                        </CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>



                                        </Box>
                                    </Box>
                                </Card>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>

            </Container>
        </React.Fragment>
    )
}
