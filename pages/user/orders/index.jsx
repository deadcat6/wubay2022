import {alpha, Box, Button, Card, styled, Table, TableContainer} from "@mui/material";
import useMuiTable from "../../../components/user/useMuiTable";
import React, {useEffect, useState} from "react";
import SimpleBar from "simplebar-react";
import UserDashboardHeader from "../../../components/UserDashboardHeader";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import CustomerDashboardLayout from "../customer-dashboard";
import {ShoppingCart} from "@mui/icons-material";
import {useSession} from "next-auth/react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import {H2} from "../../../components/Typography";
import TableHeader from "../../../components/user/order/TableHeader";
import TableBody from "@mui/material/TableBody";
import OrderRow from "../../../components/user/order/OrderRow";
import {useRouter} from "next/router";


const ProductList = () => {
  const [myProduct, setMyProduct] = useState();

  // const {products} = props;
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

  const {data: session} = useSession()
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [needRefresh, setNeedRefresh] = useState(false);

  async function removeHandler(id) {
    const res = await fetch('/api/user/cancelOrder', {
      method: 'POST',
      body: JSON.stringify({userId: session.user.id, productId: id}),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    setNeedRefresh(!needRefresh);

  }

  useEffect(() => {
    async function getMyProducts(userId) {
      setLoading(true);
      const res = await fetch('/api/product/getMyOrders', {
        method: 'POST',
        body: JSON.stringify({userId: userId}),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      setMyProduct(data.myOrders);
      // console.log("data.myProducts")
      // console.log(data.myOrders);
      setLoading(false);

    }

    if (session) {
      getMyProducts(session.user.id); //PUT PRODUCT ID
    }
  }, [session, needRefresh]);
  return loading ? (
    <LoadingSpinner text='Loading...'/>
  ) : (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={ShoppingCart}
        title="My Orders"
        navigation={<CustomerDashboardNavigation/>}
        button={
          <Button
            onClick={() => {
              router.push("/user/profile")
            }}
            variant="outlined"
            color="secondary"
            sx={{
              px: 4,
              //bgcolor: "primary.light",
            }}
          >
            Back to Profile
          </Button>
        }
      />
      {myProduct.length === 0 ? (
        <Card>
          <Box
            py={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <H2>You Have No Order</H2>
          </Box>
        </Card>
      ) : (
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
                  {filteredList.map((product, index) => (
                    <OrderRow product={product} key={index} removeHandler={removeHandler}/>
                  ))}
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
      )
      }
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
