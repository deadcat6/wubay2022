import {Box, Button} from "@mui/material";
// import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "../../components/Typography";
import ProductForm  from "./ProductForm";
import React from "react";
import * as yup from "yup";
import CustomerDashboardLayout from "../customer-dashboard";
import Person from "@mui/icons-material/Person";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import Link from "next/link";
import UserDashboardHeader from "../UserDashboardHeader";
import {Inventory2} from "@mui/icons-material";
// import {useState} from "@types/react"; // form field validation schema

const validationSchema = yup.object().shape({
  name: yup.string().required("required"),
  category: yup.string().required("required"),
  description: yup.string().required("required"),
  stock: yup.number().required("required"),
  price: yup.number().required("required"),
  sale_price: yup.number().required("required"),
  tags: yup.object().required("required"),
}); // =============================================================================


export default function EditProduct() {
  // const [product, setProduct] = useState({
  //   userId: '',
  //   userEmail: '',
  //   title: '',
  //   description: '',
  //   imagePath: [],
  //   paymentMethod: '',
  //   price: 0,
  //   transaction: {}
  // });
  const initialValues = {
    name: "",
    tags: "",
    stock: "",
    price: "",
    category: "",
    sale_price: "",
    description: "",
  };

  const handleFormSubmit = () => {};

  return (
    <CustomerDashboardLayout>
      <Box py={0}>
        <UserDashboardHeader
          icon={Inventory2}
          title="Post Product"
          navigation={<CustomerDashboardNavigation/>}
          button={
            <Link href="/profile/edit" passHref>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  px: 4,
                }}
              >
                Go Back
              </Button>
            </Link>
          }
        />

        <ProductForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleFormSubmit={handleFormSubmit}
        />
      </Box>
    </CustomerDashboardLayout>
  );
}
