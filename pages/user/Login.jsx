//domain.com/user/login

import Button from '@mui/material/Button';
import * as React from 'react';
import {useState} from 'react';
import {Box, Container, Grid, Stack, TextField} from "@mui/material";

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

export default function Login() {

    //Const for User Login
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    async function loginHandler(username, password) {
        //console.log("u is " + u);
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}


        });
        const login_data = await response.json();


    }
    return (
    <React.Fragment>

        <Container id="login"  justifyContent="left" maxWidth="sm">
            {/*这个box只是让你看到container的大小*/}
            <Box my={10} sx={{backgroundColor: 'white',}}>
                <Stack spacing={2.5} alignItems="center">
                    <h2>Log in to WUBay</h2>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        onChange={(v) => {
                            setUser({
                                ...user,
                                username: v.target.value,
                            })
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        onChange={(v) => {
                            setUser({
                                ...user,
                                password: v.target.value,
                            })
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            e.preventDefault();
                            //console.log(user);
                            loginHandler(user.username, user.password);
                            alert("username" + user.username + "  password" + user.password);
                            // sent to backend and firebase
                        }}
                    >Log In</Button>
                    {/*这里不要用 a href 该用boolean*/}
                    <a href="Signup" rel="noreferrer">No Account? Sign Up!</a>
                    <a href="link_to_url" rel="noreferrer">Forgot Password?</a>
                </Stack>
            </Box>
        </Container>

    </React.Fragment>
)
}