import {useSession} from "next-auth/react";
import * as React from 'react';
import {useEffect, useState} from 'react';
import LoadingSpinner from "../component/ui/LoadingSpinner";
import UserPage from "./UserPage";

const UserPageContainer = () => {
  const {data: session} = useSession()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function getUserInfo(userId) {
      setLoading(true);
      const res = await fetch('/api/user/getUserData', {
        method: 'POST',
        body: JSON.stringify({userId}),
        headers: {'Content-Type': 'application/json'}
      });

      const data = await res.json();
      setUser(data.user);
      //console.log(data.user);
      setLoading(false);

    }
    if (session) {
      getUserInfo(session.user.id);
    }

  }, [session]); // Or [] if effect doesn't need props or state

  return loading ? (
    <LoadingSpinner text='Loading...' />
  ) : (
    <React.Fragment>

      <UserPage user={user}/>

    </React.Fragment>
  );



}

export default UserPageContainer;