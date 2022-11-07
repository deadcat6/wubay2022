//domain,com/product/
import Button from '@mui/material/Button';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import NavBar from "../components/NavBar/NavBar";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import UserPage from "../user/UserPage";
import _ProductDetail from "./_ProductDetail";
export default function Product() {

  const router = useRouter();
  const {data: session} = useSession()
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();

  useEffect(() => {
    async function getProductInfo(pid) {
      setLoading(true);
      const res = await fetch('/api/product/getProduct', {
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
      getProductInfo(router.query.pid).then().catch(); //PUT PRODUCT ID
    }
  }, [router.isReady]);
  return loading ? (
    <LoadingSpinner text='Loading...' />
  ) : (
    <React.Fragment>

      <_ProductDetail product={product}/>

    </React.Fragment>
  );

}
