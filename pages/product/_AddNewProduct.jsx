import Button from '@mui/material/Button';
import * as React from 'react';
import {useState} from 'react';
import {Box, Container, FormControl, InputLabel, NativeSelect, Stack, TextField} from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import {useSession} from "next-auth/react";
import Grid from "@mui/material/Grid";

const _AddNewProduct = () => {
  const {data: session} = useSession();
  const [product, setProduct] = useState({
    userId: '',
    userEmail: '',
    title: '',
    description: '',
    imagePath: [],
    paymentMethod: '',
    price: 0,
    transaction: {}
  });


  async function addProductHandler() {
    const response = await fetch('/api/product/newProduct', {
      method: 'POST',
      body: JSON.stringify({
        product: {
          userId: session.user.id,
          userEmail: session.user.email,
          title: product.title,
          description: product.description,
          imagePath: product.imagePath,
          paymentMethod: product.paymentMethod,
          price: product.price,
          transaction: {}
        }

      }),
      headers: {'Content-Type': 'application/json'}


    });
    const product_data = await response.json();
    alert(product_data.message);

  }

  if (!session) {
    return (<h1>please log in</h1>)
  }
  return (

    <React.Fragment>
      <NavBar/>
      <Container id="product" justifyContent="left" maxWidth="sm">
        {/*这个box只是让你看到container的大小*/}
        <Box my={10} sx={{backgroundColor: 'white',}}>
          <Stack spacing={2.5} alignItems="center">
            <h2>List a Product</h2>
            <Grid container>
              <Grid item container direction="row">
                <Grid item xs={12} sm={6}>
                  <Stack spacing={3.5} alignItems="center">
                    <Box
                      component="img"

                      style={{maxWidth: "100%"}}
                      alt="The house from the offer."
                      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                    />

                    <Button
                      variant="contained"
                      component="label"
                    >
                      Upload File
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
                      id="standard-basic"
                      label="Product name"
                      variant="standard"
                      style={{marginLeft: "20%", maxWidth: "100%"}}
                      sx={{
                        width: {sm: 300, md: 400},
                      }}
                      onChange={(v) => {
                        setProduct({
                          ...product,
                          title: v.target.value,
                        })
                      }}
                    />
                    <TextField
                      multiline={true}
                      rows={3}
                      style={{marginLeft: "20%", maxWidth: "100%"}}
                      sx={{
                        width: {sm: 400, md: 500},
                      }}
                      id="outlined-basic"
                      label="Product description"
                      onChange={(v) => {
                        setProduct({
                          ...product,
                          description: v.target.value,
                        })
                      }}
                    />
                    <Grid container>
                      <Grid item container direction="row">
                        <Grid item xs={12} sm={6}>
                          <FormControl>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native"
                                        style={{marginLeft: "20%", maxWidth: "100%"}}>
                              Method of Payment
                            </InputLabel>
                            <NativeSelect
                              defaultValue={0}
                              style={{marginLeft: "20%", maxWidth: "100%"}}
                              sx={{
                                width: {sm: 100, md: 150},
                              }}
                              inputProps={{
                                name: 'paymentType',
                                id: 'uncontrolled-native',
                              }}
                              onChange={(v) => {
                                setProduct({
                                  ...product,
                                  paymentMethod: v.target.value,
                                })
                              }}
                            >
                              <option value={0}>Select...</option>
                              <option value={1}>Item Swap</option>
                              <option value={2}>Venmo</option>
                              <option value={3}>CashApp</option>
                              <option value={4}>Other</option>
                            </NativeSelect>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="outlined-basic"
                            label="Price"
                            style={{marginLeft: "40%", maxWidth: "80%"}}
                            sx={{
                              width: {sm: 80, md: 160},
                            }}
                            onChange={(v) => {
                              setProduct({
                                ...product,
                                price: v.target.value,
                              })
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Button
                      variant="contained"
                      sx={{
                        width: {sm: 100, md: 200},
                        height: {sm: 30, md: 60}
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        //console.log(user);
                        addProductHandler();

                        //alert("product name: " + product.name + " description: " + product.description + " Image list: " + JSON.stringify(product.imagePath) + " transaction type: " + product.transactionType);
                        // sent to backend and firebase
                      }}
                    >List the Item!</Button>
                  </Stack>

                </Grid>
              </Grid>
            </Grid>
          </Stack>

        </Box>
      </Container>
    </React.Fragment>
  )

}

export default _AddNewProduct;
