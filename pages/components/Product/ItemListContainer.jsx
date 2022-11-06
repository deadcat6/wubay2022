import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import * as React from 'react';

import ItemList from './ItemList';
import Button from "@mui/material/Button";
import LoadingSpinner from "../ui/LoadingSpinner";

const ItemListContainer = () => {

  //const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  //const {categoryId, term} = useParams();
  const [products, setProducts] = useState({});
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const res = await fetch('/api/product/listingProduct', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
        })
      const data = await res.json();
      //data.products.map(e => console.log(e))
      setProducts(data.list);
      console.log(data.list)
      setLoading(false);
      //console.log(data.products)
    }
    getProducts().then().catch(e => {alert(e)});
  }, []); // Or [] if effect doesn't need props or state


  return loading ? (
    <LoadingSpinner text='Loading...' />
  ) : (
    <React.Fragment>
      {/*<Button*/}
      {/*  onClick={(e) => {*/}
      {/*    getProducts();*/}
      {/*  }}> get products !!!!!!!!!!!!!!!!!!! </Button>*/}

      <ItemList items={products}/>

    </React.Fragment>
  );
}
export default ItemListContainer;
