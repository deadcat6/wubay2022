
import firebaseConfig from "../firebase/firebaseConfig";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {useState} from "@types/react";
import Button from "@mui/material/Button";
import * as React from "@types/react";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function getCities(db) {
  const userCollection = collection(db, 'user');
  const userSnapshot = await getDocs(userCollection);
  const userList = citySnapshot.docs.map(doc => doc.data());
  return userList;
}
