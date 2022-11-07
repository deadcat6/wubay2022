import {Box, Button} from "@mui/material";
import { H3 } from "../../components/Typography";
import ProductForm  from "./ProductForm";
import React, {useState} from "react";
import * as yup from "yup";
import CustomerDashboardLayout from "../customer-dashboard";
import Person from "@mui/icons-material/Person";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import Link from "next/link";
import UserDashboardHeader from "../UserDashboardHeader";
import {Inventory2} from "@mui/icons-material";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

const validationSchema = yup.object().shape({
  title: yup.string().required("required"),
  category: yup.string().required("required"),
  description: yup.string().required("required"),
  paymentMethod: yup.string().required("required"),
  price: yup.number().required("required"),

});


export default function AddProduct() {
  const router = useRouter();
  const {data: session} = useSession();
  const [product, setProduct] = useState({
    userId: '',
    userEmail: '',
    title: '',
    category: '',
    description: '',
    imagePath: [],
    paymentMethod: '',
    price: '',
    transaction: {}
  });


  async function addProductHandler(value) {
    const response = await fetch('/api/product/newProduct', {
      method: 'POST',
      body: JSON.stringify({
        product: {
          userId: session.user.id,
          userEmail: session.user.email,
          title: value.title,
          description: value.description,
          // imagePath: product.imagePath,
          imagePath: ['/assets/icon.png', '/assets/icon2.png'],
          category: value.category,
          paymentMethod: value.paymentMethod,
          price: value.price,
          transaction: {}
        }

      }),
      headers: {'Content-Type': 'application/json'}


    });
    const product_data = await response.json();
  }
  const handleFormSubmit = (value) => {
    setProduct(value);
    addProductHandler(value).then(() => {
     //router.push('/user/products')
    });
  };

  return (
    <CustomerDashboardLayout>
      <Box py={0}>
        <UserDashboardHeader
          icon={Inventory2}
          title="Post Product"
          navigation={<CustomerDashboardNavigation/>}
          button={
            <Link href="/user/products" passHref>
              <Button
                variant="outlined"
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
          initialValues={product}
          validationSchema={validationSchema}
          handleFormSubmit={handleFormSubmit}
        />
      </Box>
    </CustomerDashboardLayout>
  );
}
