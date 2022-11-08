import {alpha, Box, Button, Card, styled, Table, TableContainer} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "./TableHeader";
import useMuiTable from "./useMuiTable";
import OrdertRow from "./OrdertRow";
import React, {useEffect, useState} from "react";
import SimpleBar from "simplebar-react";
import UserDashboardHeader from "../UserDashboardHeader";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import Link from "next/link";
import CustomerDashboardLayout from "../customer-dashboard";
import {Inventory2, ShoppingCart} from "@mui/icons-material";
import {useSession} from "next-auth/react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";



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

  async function removeHandler(id) {
    setLoading(true);
    const res = await fetch('/api/product/removeProduct', {
      method: 'POST',
      body: JSON.stringify({productId: id}),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
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
  }, [session]);
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
              onClick={() => {router.push("/user/profile")}}
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
                  <OrdertRow product={product} key={index} removeHandler={removeHandler}/>
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
    id: "category",
    label: "Category",
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
