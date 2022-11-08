import {Container} from "@mui/material";
import MainLayout from "../../components/MainLayout";
import ProductInfo from "../../components/ProductInfo";
import {H2} from "../../components/Typography";
import * as React from "react";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const ProductDetails = (props) => {
  const router = useRouter();
  const {data: session} = useSession()
  const [loading, setLoading] = useState(true);
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
  return (loading || !product) ? (
    <MainLayout>
      <LoadingSpinner text='Loading...'/>
    </MainLayout>
  ) : (
    <MainLayout>
      <Container
        sx={{
          my: 4,
        }}
      >
        <ProductInfo product={product} id={router.query.id}/>
      </Container>
    </MainLayout>
  );
};

export default ProductDetails;
