import {Box, Button, Card, Divider} from "@mui/material";
import {styled} from "@mui/material/styles";
import {H3, Small} from "../components/Typography";
import React, {Fragment} from "react";
import {signIn, signOut, useSession} from "next-auth/react";

const BazaarButton = styled(Button)({
  minWidth: 0,
  minHeight: 0,
});
const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};
export const Wrapper = styled(({children, passwordVisibility, ...rest}) => (
  <Card {...rest}>{children}</Card>
))(({theme, passwordVisibility}) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": {...googleStyle, "&:hover": googleStyle},
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));

const Login = () => {
  return (
    <Wrapper elevation={3}>
      <H3 textAlign="center" mb={1}>
        Welcome, Please Login
      </H3>
      <Small
        mb={4.5}
        display="block"
        fontSize="12px"
        fontWeight="600"
        color="grey.800"
        textAlign="center"
      >
        WUBay, the harbor where used items receives a second life.
      </Small>


      <Fragment>
        <Box mb={2} mt={3.3}>
          <Box width="200px" mx="auto">
            <Divider/>
          </Box>

          <BazaarButton
            className="googleButton"
            size="medium"
            fullWidth
            onClick={() => signIn('google', {callbackUrl: '/user/profile'})}
            sx={{
              height: 44,
            }}
          >
            {/*<Image src="/assets/images/icons/google-1.svg" alt="facebook"/>*/}
            <Box fontSize="12px" ml={1}>
              Log in with Google
            </Box>
          </BazaarButton>
        </Box>

      </Fragment>
    </Wrapper>
  );
};

export default Login;
