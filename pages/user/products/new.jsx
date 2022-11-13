import {Box, Button} from "@mui/material";
import ProductForm from "../../../components/user/product/ProductForm";
import React, {useState} from "react";
import * as yup from "yup";
import CustomerDashboardLayout from "../customer-dashboard";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import Link from "next/link";
import UserDashboardHeader from "../../../components/UserDashboardHeader";
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

  const [img, setImg] = useState(null);


  async function addProductHandler(value) {

    let formData = new FormData();
    formData.append("userId", session.user.id);
    formData.append("userEmail", session.user.email);
    formData.append("title", value.title);
    formData.append("description", value.description);
    formData.append("category", value.category);
    formData.append("paymentMethod", value.paymentMethod);
    formData.append("price", value.price);
    if (img) {
      img.map((i, index) => {
        formData.append(`imageFile${index}`, i);
      })
    }
    fetch('/api/product/newProduct', {
      method: "POST",
      body: formData,
    }).then(r => {
      //router.push('/user/products')
    })


    // const response = await fetch('/api/product/newProduct', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     product: {
    //       userId: session.user.id,
    //       userEmail: session.user.email,
    //       title: value.title,
    //       description: value.description,
    //       // imagePath: product.imagePath,
    //       imagePath: ['/assets/icon.png', '/assets/icon2.png'],
    //       category: value.category,
    //       paymentMethod: value.paymentMethod,
    //       price: value.price,
    //       transaction: {}
    //     }
    //
    //   }),
    //   headers: {'Content-Type': 'application/json'}
    //
    //
    // });
    // const product_data = await response.json();
  }

  const handleFormSubmit = (value) => {
    if (session) {
      setProduct(value);
      addProductHandler(value).then(() => {
        //router.push('/user/products')
      });
    } else {
      alert("please login")
    }

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
          setImg={setImg}
          initialValues={product}
          validationSchema={validationSchema}
          handleFormSubmit={handleFormSubmit}
        />
      </Box>
    </CustomerDashboardLayout>
  );
}
