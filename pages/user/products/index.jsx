import {alpha, Box, Button, Card, Divider, styled, Table, TableContainer} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "../../../components/user/product/TableHeader";
import useMuiTable from "../../../components/user/useMuiTable";
import ProductRow from "../../../components/user/product/ProductRow";
import React, {useEffect, useState} from "react";
import SimpleBar from "simplebar-react";
import UserDashboardHeader from "../../../components/UserDashboardHeader";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import Link from "next/link";
import CustomerDashboardLayout from "../customer-dashboard";
import {Inventory2} from "@mui/icons-material";
import {useSession} from "next-auth/react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import OrdertRow from "../../../components/user/product/OrdertRow";
import {H2} from "../../../components/Typography";


const ProductList = () => {


  const {data: session} = useSession()
  const [loading, setLoading] = useState(true);
  const [myProduct, setMyProduct] = useState();
  const [hasActiveProduct, setHasActiveProduct] = useState(false);
  const [hasProduct, setHasProduct] = useState(false);

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: myProduct,
  });


  async function removeHandler(id) {
    setLoading(true);
    const res = await fetch('/api/product/removeProduct', {
      method: 'POST',
      body: JSON.stringify({userId: session.user.id, productId: id}),
      headers: {'Content-Type': 'application/json'}
    });
    setLoading(false);
    const data = await res.json();
  }

  useEffect(() => {
    async function getMyProducts(userId) {
      setLoading(true);
      const res = await fetch('/api/product/getMyProducts', {
        method: 'POST',
        body: JSON.stringify({userId: userId}),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      //console.log(data.myProducts)
      data.myProducts.map(p => {
        if (p.transaction.state !== 'Published') {
          setHasActiveProduct(true);
        }
        if (p.transaction.state === 'Published') {
          setHasProduct(true)
        }
      })
      setMyProduct(data.myProducts);
      setLoading(false);
    }
    if (session) {
      getMyProducts(session.user.id); //PUT PRODUCT ID
    }
  }, [session]);
  return loading ? (
    <CustomerDashboardLayout>
      <LoadingSpinner text='Loading...'/>
    </CustomerDashboardLayout>
  ) : (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Inventory2}
        title="My Products"
        navigation={<CustomerDashboardNavigation/>}
        button={
          <Link href="/user/products/new" passHref>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                px: 4,
              }}
            >
              Post New Product
            </Button>
          </Link>
        }
      />
      {!hasActiveProduct && !hasProduct && (
        <Card>
          <Box
            py={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <H2>You Have No Product</H2>
          </Box>
        </Card>
      )}
      {hasActiveProduct && (
        <>
          <Box py={0}>
            <Card>
              {/*<StyledScrollBar>*/}
              <TableContainer>
                <Table>
                  <TableHeader
                    order={order}
                    hideSelectBtn
                    orderBy={orderBy}
                    heading={orderTableHeading}
                    rowCount={myProduct.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                  />

                  <TableBody>
                    {filteredList.map((product, index) => {
                        if (product.transaction.state !== 'Published') {
                          return (
                            <OrdertRow product={product} key={index} removeHandler={removeHandler}/>
                          )
                        }
                      }
                    )
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              {/*</StyledScrollBar>*/}

              {/*<Stack alignItems="center" my={4}>*/}
              {/*  <TablePagination*/}
              {/*    onChange={handleChangePage}*/}
              {/*    count={Math.ceil(products.length / rowsPerPage)}*/}
              {/*  />*/}
              {/*</Stack>*/}
            </Card>
          </Box>


        </>
      )}

      {hasProduct && (
        <>
          <Box my={5}>
            <Divider/>
          </Box>
          <Box py={0}>
            <Card>
              {/*<StyledScrollBar>*/}
              <TableContainer>
                <Table>
                  <TableHeader
                    order={order}
                    hideSelectBtn
                    orderBy={orderBy}
                    heading={tableHeading}
                    rowCount={myProduct.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                  />

                  <TableBody>
                    {filteredList.map((product, index) => {
                        if (product.transaction.state === 'Published') {
                          return (
                            <ProductRow product={product} key={index} removeHandler={removeHandler}/>
                          )
                        }
                      }
                    )
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              {/*</StyledScrollBar>*/}

              {/*<Stack alignItems="center" my={4}>*/}
              {/*  <TablePagination*/}
              {/*    onChange={handleChangePage}*/}
              {/*    count={Math.ceil(products.length / rowsPerPage)}*/}
              {/*  />*/}
              {/*</Stack>*/}
            </Card>
          </Box>
        </>
      )}
    </CustomerDashboardLayout>

  );
}
const orderTableHeading = [
  {
    id: "name",
    label: "Title",
    align: "left",
  },
  {
    id: "date",
    label: "Date",
    align: "left",
  },

  {
    id: "paymentMethod",
    label: "Payment Method",
    align: "left",
  },
  {
    id: "state",
    label: "State",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];
const tableHeading = [
  {
    id: "name",
    label: "Name",
    align: "left",
  },
  {
    id: "date",
    label: "Date",
    align: "left",
  },
  {
    id: "state",
    label: "State",
    align: "left",
  },
  {
    id: "published",
    label: "Published",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];
const StyledScrollBar = styled(SimpleBar)(({theme}) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&.simplebar-visible:before": {
      opacity: 1,
    },
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[400], 0.6),
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 9,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
}));
export default ProductList;
