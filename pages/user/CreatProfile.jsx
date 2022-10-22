//TODO: Tony: new user first time loged in should creat a profile, just like the signup page.
//TODO: Ajay: in this CreatProfile page, Create a api to update the user's info to db.

import {useSession} from "next-auth/react";

const CreatProfile = () => {
  const {data: session} = useSession()

  return (
    <h1>hello ! {session.user.email} please creat a new profile</h1>

  )
}

export default CreatProfile;