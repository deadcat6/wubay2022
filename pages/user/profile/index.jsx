import Person from "@mui/icons-material/Person";
import {Avatar, Box, Button, Card, Grid, Typography} from "@mui/material";
import {FlexBetween, FlexBox} from "../../components/flex-box";
import UserDashboardHeader from "../UserDashboardHeader";
import CustomerDashboardLayout from "../customer-dashboard/index";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import MainLayout from "../../components/MainLayout";
import {Stack} from "@mui/system";
import {H1, H2, H3, H6} from "../../components/Typography";


const Profile = () => {
  const router = useRouter();
  const {data: session} = useSession()
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    rating: 5,
    myProducts: [],
    myOrders: [],
    usersChats: [],
    newUser: true,
  });
  useEffect(() => {
    async function getUserInfo(user) {
      setLoading(true);
      const res = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({user: user}),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      //data.products.map(e => console.log(e))
      if (data.userData.newUser) {
        router.push('profile/edit');
      }
      const p = {...data.userData, imageUrl: session.user.image};

      setProfile(p);
      setLoading(false);
      return data.userData;
    }

    if (session) {
      console.log(session)
      getUserInfo(session.user);
    }

  }, [session]); // Or [] if effect doesn't need props or state

  return loading ? (
    <MainLayout>
      <LoadingSpinner text='Loading...'/>
    </MainLayout>
  ) : (
    <ProfileData profile={profile}/>
  );
};

export default Profile;

const ProfileData = ({profile}) => {
  return (
  <CustomerDashboardLayout>
    <UserDashboardHeader
      icon={Person}
      title="My Profile"
      navigation={<CustomerDashboardNavigation/>}
      button={
        <Button
          onClick={() => signOut({callbackUrl:'/'})}
          variant="outlined"
          color="secondary"
          sx={{
            px: 4,
          }}
        >
          Sign Out
        </Button>

      }
    />


    <Box mb={4}>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Card
            sx={{
              display: "flex",
              p: "14px 32px",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Avatar
              src={profile.imageUrl}
              sx={{
                height: 64,
                width: 64,
              }}
            />

            <Box ml={1.5} flex="1 1 0">
              <FlexBetween flexWrap="wrap">
                <Grid container>
                  <Grid item xs={8} >
                    <Stack spacing={0}>
                      <H2 >{profile.username}</H2>
                        <H6 my="0px">{profile.firstname}  {profile.lastname}</H6>
                        <H6  color="primary.main">
                          {profile.email}
                        </H6>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <FlexBox alignItems="center" pt={3}>
                      <Link href="profile/edit" passHref>
                        <Button
                          variant="outlined"
                          color="secondary"
                          sx={{
                            px: 4,
                          }}
                        >
                          Edit
                        </Button>
                      </Link>
                    </FlexBox>
                  </Grid>
                </Grid>
              </FlexBetween>
            </Box>
          </Card>
        </Grid>

        <Grid item md={6} xs={12}>
          <Grid container spacing={2}>
              <Grid item  xs={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    p: "1rem 1.25rem",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h3 color="primary.main" my={0} fontWeight={600}>
                    {profile.myProducts.length}
                  </h3>
                  <h6 color="grey.600" textAlign="center">
                   My Products
                  </h6>
                </Card>
              </Grid>
            <Grid item xs={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  p: "1rem 1.25rem",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h3 color="primary.main" my={0} fontWeight={600}>
                  {profile.myOrders.length}
                </h3>
                <h6 color="grey.600" textAlign="center">
                  My Orders
                </h6>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  p: "1rem 1.25rem",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h3 color="primary.main" my={0} fontWeight={600}>
                  {profile.usersChats.length}
                </h3>
                <h6 color="grey.600" textAlign="center">
                  My Messages
                </h6>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </CustomerDashboardLayout>
)

}