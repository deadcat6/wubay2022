import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import * as React from 'react';

import ItemList from './ItemList';
import Button from "@mui/material/Button";
import LoadingSpinner from "../ui/LoadingSpinner";

const ItemListCointainer = () => {

  //const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  //const {categoryId, term} = useParams();
  const [products, setProducts] = useState({});
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const res = await fetch('/api/get_products');
      const data = await res.json();
      //data.products.map(e => console.log(e))
      setProducts(data.products);
      setLoading(false);
    }
    getProducts();
  }, []); // Or [] if effect doesn't need props or state




  const getProducts = async () => {
    const res = await fetch('/api/get_products');
    const data = await res.json();
    //data.products.map(e => console.log(e))
    //console.log(data);
    setProducts(data.products);
    //alert(data.products);

  }

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
export default ItemListCointainer;
