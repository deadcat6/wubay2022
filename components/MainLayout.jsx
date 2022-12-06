// import Footer from "components/footer/Footer";
// import Header from "components/header/Header";
// import MobileNavigationBar from "components/mobile-navigation/MobileNavigationBar";
// import Sticky from "components/sticky/Sticky";
// import Topbar from "components/topbar/Topbar";
// import Navbar from "components/navbar/Navbar";
import React, { Fragment, useCallback, useState } from "react";
import NavBar from "./NavBar/NavBar";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/system";
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({

  status: {
    danger: '#e53e3e',
  },
  palette: {
    mode: 'light',
    // background: {
    //   default: "#e60505"
    // },
    primary: {

      main: '#9e1418',
      darker: '#053e85',
    },

    secondary: {
      main: '#006b59',
      darker: '#053e85',
    },
    logo: {
      main: '#f4f5f5',
      darker: '#053e85',
    },
    neutral: {
      main: '#f4f5f5',
      contrastText: '#fff',
    },
  },
});
const MainLayout = ({
                       children,
                       showTopbar = true,
                       topbarBgColor,
                       showNavbar = true,
                     }) => {
  // const [isFixed, setIsFixed] = useState(false);
  // const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), []);



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Fragment>
      <NavBar/>
      {/* TOPBAR */}
      {/*{showTopbar && <Topbar bgColor={topbarBgColor} />}*/}

      {/* HEADER */}
      {/*<Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>*/}
      {/*  <Header isFixed={isFixed} />*/}
      {/*</Sticky>*/}

      <div className="section-after-sticky">
        {/* NAVIGATION BAR */}
        {/*{showNavbar && <Navbar elevation={0} border={1} />}*/}

        {/* BODY CONTENT */}
        {children}
      </div>

      {/*<MobileNavigationBar />*/}
      {/*<Footer />*/}
    </Fragment>
    </ThemeProvider>
  );
};

export default MainLayout;
