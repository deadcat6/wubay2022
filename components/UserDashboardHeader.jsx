import {Box, styled} from "@mui/material";
import React from "react";

const StyledBox = styled(Box)(({theme}) => ({
  display: "flex",
  marginTop: theme.spacing(-2),
  marginBottom: theme.spacing(3),
  "& .headerHold": {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  // [theme.breakpoints.up("md")]: {
  //   "& .sidenav": {
  //     display: "none",
  //   },
  // },
  // [theme.breakpoints.down("md")]: {
  //   flexDirection: "column",
  // },
}));

const UserDashboardHeader = ({title, button, navigation, ...props}) => {
  // const width = useWindowSize();
  // const isTablet = width < 1025;
  return (
    <StyledBox>
      <Box display="flex" mt={2} className="headerHold">
        <Box display="flex" alignItems="center">
          {props.icon && <props.icon color="primary"/>}
          <Box component="h2"
               mb={0}
               mt={0}
               fontSize="25px"
               fontWeight="700"
               ml={1.5}
               my="0px"
               lineHeight="1"
               whiteSpace="pre">
            {title}
          </Box>
        </Box>
        <Box display="flex" alignItems="right">
          {button}

        </Box>



        {/*<Box className="sidenav">*/}
        {/*  <Sidenav position="left" handle={<Menu fontSize="small" />}>*/}
        {/*    {navigation}*/}
        {/*  </Sidenav>*/}
        {/*</Box>*/}

        {/*{!isTablet && button}*/}

      </Box>

      {/*{isTablet && !!button && <Box mt={2}>{button}</Box>}*/}
    </StyledBox>
  );
};

export default UserDashboardHeader;
