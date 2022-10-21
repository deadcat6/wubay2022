import * as React from 'react';
import MainPage from "./MainPage";
import firebaseDemo from "./firebaseDemo";
import NavBar from "./component/NavBar/NavBar";

export default function Home() {

  return (
   <React.Fragment>
     <NavBar/>
     <MainPage/>
   </React.Fragment>
  );

}
