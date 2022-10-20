import * as React from 'react';

import firebaseConfig from "../firebase/firebaseConfig";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import {useState} from "react";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";


export default function Home() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [users, setUser] = useState();
  async function getCities(db) {
    const userCollection = collection(db, 'user');
    const userSnapshot = await getDocs(userCollection);
    const userList = userSnapshot.docs.map(doc => doc.data());
    setUser(userList)
    return userList;
  }

  return (
    <div>
      {JSON.stringify(users)},{' '}
      <Button
        variant="contained"
        onClick={() => {getCities(db)}}
      >getUser</Button>


    </div>
  );

}
