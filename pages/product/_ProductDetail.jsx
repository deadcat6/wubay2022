import {signOut, useSession} from "next-auth/react";
import Button from '@mui/material/Button';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Rating,
  Stack,
  TextField,
  Tooltip
} from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import emailjs from "@emailjs/browser";


const _ProductDetail = ({product}) => {
  let paymentIcon = ["", "https://filehandler.revlocal.com/600851", "https://1000logos.net/wp-content/uploads/2021/12/Venmo-Logo.png", "https://www.logo.wine/a/logo/Cash_App/Cash_App-Logo.wine.svg", "https://cdn-icons-png.flaticon.com/512/2489/2489756.png"];
  const {data: session} = useSession()

  return (
    <React.Fragment>
      <NavBar/>
      <Box my={8}>
        <Container id="Product"  spacing={2} >
          <Grid container>
            <Grid item container direction="row">
              <Grid item xs={6} sm={6}>
                <Stack spacing={1.2}>
                  <Box
                    component="img"
                    sx={{}}
                    style={{maxWidth: "85%", maxHeight: "85%"}}
                    alt="Avatar"
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                  />
                  <Grid container spacing={2}>
                    <Grid item container direction="row">
                      <Grid item xs={2.5}>
                        <Box
                          component="img"
                          sx={{}}
                          style={{maxWidth: "90%", maxHeight: "90%"}}
                          alt="Avatar"
                          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                        />
                      </Grid>
                      <Grid item xs={2.5}>
                        <Box
                          component="img"
                          sx={{}}
                          style={{maxWidth: "90%", maxHeight: "90%"}}
                          alt="Avatar"
                          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                        />
                      </Grid>
                      <Grid item xs={2.5}>
                        <Box
                          component="img"
                          sx={{}}
                          style={{maxWidth: "90%", maxHeight: "90%"}}
                          alt="Avatar"
                          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                        />
                      </Grid>
                      <Grid item xs={2.5}>
                        <Box
                          component="img"
                          sx={{}}
                          style={{maxWidth: "90%", maxHeight: "90%"}}
                          alt="Avatar"
                          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Card sx={{display: 'flex', width: 0.8}}>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                          <Grid item container direction="row">
                            <Grid item xs={6.5}>
                              <Typography component="legend">Sold By</Typography>
                              <a href="seller page" rel="noreferrer">{product.username}</a>
                            </Grid>
                            <Grid item xs={2.4}>
                              <Typography component="legend">Rating</Typography>
                              <Rating name="Seller Rating" value={product.sellerRating} readOnly/>
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
                        <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Stack spacing={2.5} alignItems="center">
                  <Typography variant={"h3"}>{product.title}</Typography>
                  <p>{product.desc}</p>
                  <Card sx={{display: 'flex', width: 0.8}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                      <CardContent sx={{flex: '1 0 auto',}}>
                        <Grid container>
                          <Grid item container direction="row">

                            <Grid item xs={4} md={4}>
                              <Typography component="div" variant="h5">
                                Price
                              </Typography>
                              <Typography variant="h6" color="text.primary" component="div">
                                {product.price}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Box
                                component="img"
                                sx={{}}
                                style={{maxWidth: "85%", maxHeight: "85%"}}
                                alt="Payment method"
                                src={paymentIcon[1]}
                              />

                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Button
                                variant="contained"
                                sx={{
                                  width: {sm: 50, md: 100},
                                  height: {sm: 30, md: 60},
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  //PurchaseHandler
                                  let emailData = {
                                    to_name: product.username,
                                    from_name: session.user.name,
                                    item_name: product.name,
                                    from_email: session.user.email,
                                    reply_to: product.lister_email
                                  };
                                  let send = prompt("Buyer: " + emailData.from_name + " Seller: " + emailData.to_name + " Item: " + emailData.item_name + " Buyer email: " + emailData.from_email + " to: " + emailData.reply_to + ".\n\nEnter confirm to send.");
                                  if (send === "confirm") {
                                    emailjs.send('service_32765vj', 'template_2es1tce', emailData, 'iNXQcfJgGe4A7EoEe')
                                      .then((result) => {
                                        alert("email sent. Check the seller's email.");
                                      }, (error) => {
                                        //console.log(error.text);
                                      });
                                  }

                                }}
                              >Purchase Now</Button>
                            </Grid>
                          </Grid>
                        </Grid>

                      </CardContent>
                    </Box>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

        </Container>
      </Box>

    </React.Fragment>
  )
}

export default _ProductDetail;