import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import {useSession} from "next-auth/react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

const Login = () => {
  const {data: session} = useSession()
  const [err, setErr] = useState(false);

  <Router>
    const navigate = useNavigate();
  </Router>


  const [user_info, set_user_info] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    rating: '',
    photoURL: '',
    postedProducts: [], // postedProducts: [Product]: the products user posted but no one has bought yet.
    BuyerTransactions: [], // BuyerTransactions:[Transactions]: the products user bought like {orders}.
    sellerTransactions: [], //sellerTransactions:[Transactions] the products user sold.
    usersChats: [] //usersChats: [Chats]
  })

  useEffect(() => {
    async function getUserInfo(email) {
      const res = await fetch('/api/user_data', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: {'Content-Type': 'application/json'}
      });

      const data = await res.json();
      set_user_info(data.user_data);
      //console.log(data.user_data);

    }
    if (session) {
      getUserInfo(session.user.email);

    }

  }, [session]); // Or [] if effect doesn't need props or state

  const email = session.user.email;
  const password = user_info.password;

  try {
    signInWithEmailAndPassword(auth, email, password);
    navigate("/")
  } catch (err) {
    setErr(true);
  }
};

export default Login;
