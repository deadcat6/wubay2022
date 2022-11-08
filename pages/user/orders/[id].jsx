import {Box, Button} from "@mui/material";
import ProductForm from "./ProductForm";
import React, {useEffect, useState} from "react";
import * as yup from "yup";
import CustomerDashboardLayout from "../customer-dashboard";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import Link from "next/link";
import UserDashboardHeader from "../UserDashboardHeader";
import {Inventory2} from "@mui/icons-material";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const validationSchema = yup.object().shape({
  title: yup.string().required("required"),
  category: yup.string().required("required"),
  description: yup.string().required("required"),
  paymentMethod: yup.string().required("required"),
  price: yup.number().required("required"),

});


export default function AddProduct() {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    async function getProductInfo(pid) {
      setLoading(true);
      const res = await fetch('/api/product/getProductDetail', {
        method: 'POST',
        body: JSON.stringify({productId: pid}),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      setProduct(data.product);
      //console.log(data.product);
      setLoading(false);

    }

    if (router.isReady) {
      console.log(router.query.id)
      getProductInfo(router.query.id).then().catch(); //PUT PRODUCT ID
    }
  }, [router.isReady]);

  async function editProductHandler(value) {
    const response = await fetch('/api/product/setProduct', {
      method: 'POST',
      body: JSON.stringify({
        productId: router.query.id,
        product: {
          title: value.title,
          description: value.description,
          // imagePath: product.imagePath,
          imagePath: '/assets/icon.png',
          category: value.category,
          paymentMethod: value.paymentMethod,
          price: value.price,
        }

      }),
      headers: {'Content-Type': 'application/json'}


    });
    const product_data = await response.json();
  }

  const handleFormSubmit = (value) => {
    setProduct(value);
    editProductHandler(value).then(() => {
      router.push('/user/products')
    });
  };

  return loading ? (
    <LoadingSpinner text='Loading...'/>
  ) : (
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
