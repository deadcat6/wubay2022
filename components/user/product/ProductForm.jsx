import { Button, Card, Grid, MenuItem, TextField } from "@mui/material";
import DropZone from "./DropZone";
import { Formik } from "formik";
import React from "react";

// ================================================================
const ProductForm = (props) => {
  const { initialValues, validationSchema, handleFormSubmit, setImg} = props;
  return (
    <Card
      sx={{
        p: 6,
      }}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="Title"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="category"
                  onBlur={handleBlur}
                  placeholder="Category"
                  onChange={handleChange}
                  value={values.category}
                  label="Select Category"
                  error={!!touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                >
                  <MenuItem value="Textbook">Textbook</MenuItem>
                  <MenuItem value="Grocery">Grocery</MenuItem>
                  <MenuItem value="Clothing & Beauty">Clothing & Beauty</MenuItem>
                  <MenuItem value="Electronic & Entertainment">Electronic & Entertainment</MenuItem>
                  <MenuItem value="Furniture & Household">Furniture & Household</MenuItem>
                  <MenuItem value="Office & School Supplies">Office & School Supplies</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>

                </TextField>
              </Grid>

              <Grid item xs={12}>
                <DropZone onChange={(files) => setImg(files)} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  rows={6}
                  multiline
                  fullWidth
                  color="info"
                  size="medium"
                  name="description"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Description"
                  value={values.description}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="price"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.price}
                  label="Price"
                  onChange={handleChange}
                  placeholder="Price"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="paymentMethod"
                  onBlur={handleBlur}
                  placeholder="paymentMethod"
                  onChange={handleChange}
                  value={values.paymentMethod}
                  label="Select Payment Method"
                  error={!!touched.paymentMethod && !!errors.paymentMethod}
                  helperText={touched.paymentMethod && errors.paymentMethod}
                >
                  <MenuItem value="Face-To-Face">Face-To-Face</MenuItem>
                  <MenuItem value="Stripe">Stripe</MenuItem>
                  <MenuItem value="Venmo">Venmo</MenuItem>
                  <MenuItem value="Contact Me">Contact Me</MenuItem>
                </TextField>
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Save product
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default ProductForm;
