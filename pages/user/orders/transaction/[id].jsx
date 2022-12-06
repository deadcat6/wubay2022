import {alpha, Box, Button, Card, Divider, styled, Table, TableContainer} from "@mui/material";

import React, {useEffect, useState} from "react";
import SimpleBar from "simplebar-react";
import UserDashboardHeader from "../../../../components/UserDashboardHeader";
import CustomerDashboardNavigation from "../../customer-dashboard/Navigations";
import Link from "next/link";
import CustomerDashboardLayout from "../../customer-dashboard";
import {Inventory2} from "@mui/icons-material";
import {useSession} from "next-auth/react";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import ProductInfo from "../../../../components/ProductInfo";

import {useRouter} from "next/router";
import {Container} from "@mui/system";
import BuyerTransactionInfo from "../../../../components/BuyerTransactionInfo";


const BuyerTransaction = () => {

  const {data: session} = useSession()
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProductInfo(id) {
      setLoading(true);
      const res = await fetch('/api/product/getProductDetail', {
        method: 'POST',
        body: JSON.stringify({productId: id}),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      setProduct(data.product);
      //console.log(data.product);
      setLoading(false);
    }
    if (router.isReady) {
      getProductInfo(router.query.id).then().catch(); //PUT PRODUCT ID
    }
  }, [router.isReady]);



  return loading ? (
    <CustomerDashboardLayout>
      <LoadingSpinner text='Loading...'/>
    </CustomerDashboardLayout>
  ) : (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Inventory2}
        title="Transaction Detail"
        navigation={<CustomerDashboardNavigation/>}
        button={
          <Link href="/user/orders" passHref>
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

      <Container
        sx={{
          my: 4,
        }}
      >
        <BuyerTransactionInfo product={product} id={router.query.id}/>
      </Container>
    </CustomerDashboardLayout>

  );
}
export default BuyerTransaction;
