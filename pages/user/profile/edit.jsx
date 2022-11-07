import CameraEnhance from "@mui/icons-material/CameraEnhance";
import Person from "@mui/icons-material/Person";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {Card, styled, Avatar, Box, Button, Grid, TextField, Divider} from "@mui/material";
// import Card1 from "components/Card1";
import { FlexBox } from "../../components/flex-box";
import UserDashboardHeader from "../UserDashboardHeader";
import CustomerDashboardLayout from "../customer-dashboard/index";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import { Formik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import {useSession} from "next-auth/react";
import React, {useEffect, useState} from "react";
import MainLayout from "../../components/MainLayout";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import {router} from "next/client";
import {useRouter} from "next/router";
const Card1 = styled(Card)({
  position: "relative",
  padding: "1.5rem 1.75rem",
  ["@media only screen and (max-width: 678px)"]: {
    padding: "1rem",
  },
});
const checkoutSchema = yup.object().shape({
  firstname: yup.string().required("required"),
  lastname: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  //phone: yup.string().required(),
  //birth_date: yup.date().required("invalid date"),
});
const ProfileEditor = () => {
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
      const p = {...data.userData, imageUrl: session.user.image};
      setProfile(p);
      setLoading(false);
      return data.userData;
    }

    if (session) {
      getUserInfo(session.user);
    }

  }, [session]); // Or [] if effect doesn't need props or state
  const handleFormSubmit = async (values) => {
    //console.log(values);
    setProfile(values);
    const response = await fetch('/api/user/setProfile', {
      method: 'POST',
      body: JSON.stringify({
          userId: session.user.id,
          profile: {
            username: values.username,
            email: values.email,
            firstname: values.firstname,
            lastname: values.lastname,
            phone: values.phone,
          }
        }
      ),
      headers: {'Content-Type': 'application/json'}
    });
    if (response) {
      router.push('/user/profile')
    }
  };
  return loading ? (
    <MainLayout>
      <LoadingSpinner text='Loading...'/>
    </MainLayout>
  ) : (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Person}
        title="Edit Profile"
        navigation={<CustomerDashboardNavigation />}
        button={
          <Link href="/user/profile" passHref>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                px: 4,
                //bgcolor: "primary.light",
              }}
            >
              Back to Profile
            </Button>
          </Link>
        }
      />

      <Card1>
        <FlexBox alignItems="flex-end" mb={3}>
          <Avatar
            src={profile.imageUrl}
            sx={{
              height: 64,
              width: 64,
            }}
          />

          {/*<Box ml={-2.5}>*/}
          {/*  <label htmlFor="profile-image">*/}
          {/*    <Button*/}
          {/*      component="span"*/}
          {/*      color="secondary"*/}
          {/*      sx={{*/}
          {/*        p: "8px",*/}
          {/*        height: "auto",*/}
          {/*        bgcolor: "grey.300",*/}
          {/*        borderRadius: "50%",*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <CameraEnhance fontSize="small" />*/}
          {/*    </Button>*/}
          {/*  </label>*/}
          {/*</Box>*/}

          {/*<Box display="none">*/}
          {/*  <input*/}
          {/*    onChange={(e) => console.log(e.target.files)}*/}
          {/*    id="profile-image"*/}
          {/*    accept="image/*"*/}
          {/*    type="file"*/}
          {/*  />*/}
          {/*</Box>*/}
        </FlexBox>

        <Formik
          initialValues={profile}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      onBlur={handleBlur}
                      value={values.username}
                      onChange={handleChange}
                      error={!!touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Phone (Opt)"
                      name="phone"
                      onBlur={handleBlur}
                      value={values.phone}
                      onChange={handleChange}
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="firstname"
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstname}
                      error={!!touched.firstname && !!errors.firstname}
                      helperText={touched.firstname && errors.firstname}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="lastname"
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastname}
                      error={!!touched.lastname && !!errors.lastname}
                      helperText={touched.lastname && errors.lastname}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      label="Email"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>


                  {/*<Grid item md={6} xs={12}>*/}
                  {/*  <LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                  {/*    <DateTimePicker*/}
                  {/*      label="Birth Date"*/}
                  {/*      maxDate={new Date()}*/}
                  {/*      value={values.birth_date}*/}
                  {/*      inputFormat="dd MMMM, yyyy"*/}
                  {/*      shouldDisableTime={() => false}*/}
                  {/*      renderInput={(props) => (*/}
                  {/*        <TextField*/}
                  {/*          fullWidth*/}
                  {/*          size="small"*/}
                  {/*          helperText={touched.birth_date && errors.birth_date}*/}
                  {/*          error={*/}
                  {/*            (!!touched.birth_date && !!errors.birth_date) ||*/}
                  {/*            props.error*/}
                  {/*          }*/}
                  {/*          {...props}*/}
                  {/*        />*/}
                  {/*      )}*/}
                  {/*      onChange={(newValue) =>*/}
                  {/*        setFieldValue("birth_date", newValue)*/}
                  {/*      }*/}
                  {/*    />*/}
                  {/*  </LocalizationProvider>*/}
                  {/*</Grid>*/}
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary" >
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </CustomerDashboardLayout>
  );
};


export default ProfileEditor;
