import {alpha, Box, Button, Card, Stack, styled, Table, TableContainer} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
// import VendorDashboardLayout from "../../../src/components/layouts/vendor-dashboard";
import useMuiTable from "./useMuiTable";
import ProductRow from "./ProductRow";
import React from "react";
import SimpleBar from "simplebar-react";
import UserDashboardHeader from "../UserDashboardHeader";
import Person from "@mui/icons-material/Person";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import Link from "next/link";
import CustomerDashboardLayout from "../customer-dashboard";
import {Inventory2} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
// import UserDashboardHeader from "../UserDashboardHeader";


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
})); // props type
// =============================================================================
const ProductList = () => {
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
      const res = await fetch('/api/product/getMyProducts', {
        method: 'POST',
        body: JSON.stringify({userId: userId}),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      setMyProduct(data.myProducts);
      console.log("data.myProducts")
      console.log(data.myProducts);
      setLoading(false);

    }
    if (session){
      getMyProducts(session.user.id); //PUT PRODUCT ID
    }
  }, [session]);
  return loading ? (
    <LoadingSpinner text='Loading...' />
  ) : (
    // <UserDashboardHeader>
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
                  {filteredList.map((product, index) => (
                    <ProductRow product={product} key={index} removeHandler={removeHandler}/>
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

export default ProductList;
