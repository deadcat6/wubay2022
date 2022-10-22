import {useSession} from "next-auth/react";
{/*TODO: Tony: AccountPage that display user info.*/}
{/*TODO: Ajay: Create a api to fetch the user's info from db.*/}
const AccountPage = () => {
  const {data: session} = useSession()

  return (
    <h1>hello ! {session.user.email}</h1>

  )
}

export default AccountPage;