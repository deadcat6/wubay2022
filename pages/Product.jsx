//domain.com/product

import Head from 'next/head'
import Image from 'next/image'

import Button from '@mui/material/Button';
import * as React from 'react';
import {TextField, FormControl, InputLabel, Select, MenuItem, NativeSelect} from "@mui/material";
import {useState} from "react";
export default function Auth() {

    //Const for User Login
    const [product, setProduct] = useState({
        lister: '',
        productName: '',
        productDescription: '',
        productImagePath: ["/image.jpg"],
        timeCreated: '',
        transactionType: '',
        sellProgress: ''
    });


    return (
        <React.Fragment>
            <h2>Submit a Product</h2>
            <TextField
                id="outlined-basic"
                label="Product name"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onChange={(v) => {
                    setProduct({
                        ...product,
                        productName: v.target.value,
                    })
                }}
            /><br></br>
            <TextField
                multiline={true}
                rows={3}
                id="outlined-basic"
                label="Product description"
                onChange={(v) => {
                    setProduct({
                        ...product,
                        productDescription:v.target.value,
                    })
                }}
            /><br></br>

            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Method of Payment
                </InputLabel>
                <NativeSelect
                    defaultValue={0}
                    inputProps={{
                        name: 'paymentType',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={0}>Item Swap</option>
                    <option value={1}>Venmo</option>
                    <option value={2}>CashApp</option>
                    <option value={3}>Other</option>
                </NativeSelect>
            </FormControl> <br></br>

            <TextField
                id="outlined-basic"
                label="New Username"
                onChange={(v) => {
                    setRegister({
                        ...register,
                        username:v.target.value,
                    })
                }}
            /><br></br>
            <TextField
                id="outlined-basic"
                label="New Password"
                onChange={(v) => {
                    setRegister({
                        ...register,
                        password:v.target.value,
                    })
                }}
            /><br></br>
            <TextField
                id="outlined-basic"
                label="First Name"
                onChange={(v) => {
                    setRegister({
                        ...register,
                        firstname:v.target.value,
                    })
                }}
            /><br></br>
            <TextField
                id="outlined-basic"
                label="Last Name"
                onChange={(v) => {
                    setRegister({
                        ...register,
                        lastname:v.target.value,
                    })
                }}
            /><br></br>
            <TextField
                id="outlined-basic"
                label="Email"
                onChange={(v) => {
                    setRegister({
                        ...register,
                        email:v.target.value,
                    })
                }}
            /><br></br>
            <TextField
                id="outlined-basic"
                label="Phone number"
                onChange={(v) => {
                    setRegister({
                        ...register,
                        phone:v.target.value,
                    })
                }}
            /><br></br><br></br>

            <Button
                variant="contained"
                onClick={(e) => {
                    e.preventDefault();
                    //console.log(user);
                    alert("username" + register.username + "  password" + register.password + "  first name" + register.firstname+ "  last name" + register.lastname + "  email" + register.email+ "  phone" + register.phone);
                    // sent to backend and firebase
                }}
            >Sign Up</Button><br></br><br></br><br></br>

        </React.Fragment>
    )
}

