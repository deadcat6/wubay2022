//domain,com/product/
import Button from '@mui/material/Button';
import * as React from 'react';
import {Box, Container, Rating, Stack, Tooltip, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import emailjs from "@emailjs/browser";
import {useState} from 'react';

export default function Product() {
  let starValue = 5;
  let emailAddress = "i5904503668i@gmail.com";
  let price = "$0.99";
  let methodPayment = 1;
  let paymentIcon = ["", "https://filehandler.revlocal.com/600851", "https://1000logos.net/wp-content/uploads/2021/12/Venmo-Logo.png", "https://www.logo.wine/a/logo/Cash_App/Cash_App-Logo.wine.svg", "https://cdn-icons-png.flaticon.com/512/2489/2489756.png"];
  const theme = useTheme();
  const [product_info, set_profile_info] = useState({
    lister: '', //Lister should be acquired in the backend.
    name: '',
    description: '',
    imagePath: ["/image.jpg"], //Dummy path to images for now. Don't know where to put the file yet.
    timeCreated: '',    //This should be acquired in the backend.
    transactionType: '',
    price: '',
    sellProgress: ''   //This should be defaulted to 0 in the backend.
  });

  useEffect(() => {
    async function getProductInfo(pid) {
      const res = await fetch('/api/product_info', {
        method: 'POST',
        body: JSON.stringify({pid}),
        headers: {'Content-Type': 'application/json'}
      });
  
      const data = await res.json();
      set_product_info(data);
      //console.log(data.user_data);
      
    }
    if (session) {
      getProductInfo(pid); //PUT PRODUCT ID
      
    }
  
  }, [session]); // Or [] if effect doesn't need props or state

  //Set props for product
  return (
    <React.Fragment>
      <Container id="Product" justifyContent="left" spacing={2}>
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
                            <a href="seller page" rel="noreferrer">Seller name</a>
                          </Grid>
                          <Grid item xs={2.4}>
                            <Typography component="legend">Rating</Typography>
                            <Rating name="Seller Rating" value={starValue} readOnly/>
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
                <Typography variant={"h3"}>{product_info.name}</Typography>
                <p>{product_info.description}</p>
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
                              {product_info.price}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} md={4}>
                            <Box
                              component="img"
                              sx={{}}
                              style={{maxWidth: "85%", maxHeight: "85%"}}
                              alt="Payment method"
                              src={paymentIcon[methodPayment]}
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
                                  to_name: value=product_info.lister,
                                  from_name: "Buyer Name",
                                  item_name: product_info.name,
                                  from_email: "Buyer Email",
                                  reply_to: "mtngckover@gmail.com"
                                };
                                let send = prompt("Buyer: " + emailData.from_name + " Seller: " + emailData.to_name + " Item: " + emailData.item_name + " Buyer email: " + emailData.from_email + " to: " + emailData.reply_to + ".\n\nEnter 1 to send.");
                                if (send === "1") {
                                  emailjs.send('service_32765vj', 'template_2es1tce', emailData, 'iNXQcfJgGe4A7EoEe')
                                    .then((result) => {
                                      alert("email sent. Check the seller's email.");
                                    }, (error) => {
                                      console.log(error.text);
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
    </React.Fragment>
  )
}
