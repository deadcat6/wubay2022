import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import {useSession} from "next-auth/react";

const Navbar = () => {
    const {data: session} = useSession()

    async function getUserInfo(email) {
        const res = await fetch('/api/user_data', {
            method: 'POST',
            body: JSON.stringify({email}),
            headers: {'Content-Type': 'application/json'}
        });

        const data = await res.json();
    }
    if (session) {
        getUserInfo(session.user.email);

    }
  return (
    <div className='navbar'>
      <span className="logo"></span>
      <div className="user">
          <img src={session.user.image} alt="" />
          <span>{session.user.}</span>
        <button onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar