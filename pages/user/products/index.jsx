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
  const products = [
    {
      price: 250,
      published: true,
      id: "6ed34Edf65d",
      category: "Gadgets",
      name: "Samsung Galaxy-M1",
      brand: "/assets/images/brands/samsung.png",
      image: "/assets/images/products/samsung.png",
    },
    {
      price: 10,
      published: true,
      id: "6ed34Edf65d",
      category: "Grocery",
      name: "Tomatto",
      brand: "/assets/images/brands/brokshire.png",
      image: "/assets/images/products/tomato.png",
    },
    {
      price: 24,
      published: false,
      id: "6ed34Edf65d",
      category: "Beauty",
      name: "Boston Round Cream Pack",
      brand: "/assets/images/brands/levis.png",
      image: "/assets/images/products/beauty-cream.png",
    },
    {
      price: 35,
      published: true,
      id: "6ed34Edf65d",
      category: "Fashion",
      name: "Woman Party Dress",
      brand: "/assets/images/brands/raymond.png",
      image: "/assets/images/products/red-dress.png",
    },
    {
      price: 16,
      published: true,
      id: "6ed34Edf65d",
      category: "Fashion",
      name: "White Tops",
      brand: "/assets/images/brands/raymond.png",
      image: "/assets/images/products/white-tops.png",
    },
    {
      price: 26,
      published: false,
      id: "6ed34Edf65d",
      category: "Fashion",
      name: "Casual Shirt for Man",
      brand: "/assets/images/brands/raymond.png",
      image: "/assets/images/products/formal-shirt.png",
    },
    {
      price: 21,
      published: true,
      id: "6ed34Edf65d",
      category: "Fashion",
      name: "Blue Premium T-shirt",
      brand: "/assets/images/brands/raymond.png",
      image: "/assets/images/products/blu-tshirt.png",
    },
    {
      price: 12,
      published: false,
      id: "6ed34Edf65d",
      category: "Fashion",
      name: "Man Trowzer Pant",
      brand: "/assets/images/brands/raymond.png",
      image: "/assets/images/products/pnat.png",
    },
  ];
  const tableHeading = [
    {
      id: "name",
      label: "Name",
      align: "left",
    },
    {
      id: "category",
      label: "Category",
      align: "left",
    },
    {
      id: "brand",
      label: "Brand",
      align: "left",
    },
    {
      id: "price",
      label: "Price",
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
    listData: products,
  });

  return (
    // <UserDashboardHeader>
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Person}
        title="My Profile"
        navigation={<CustomerDashboardNavigation/>}
        button={
          <Link href="/profile/edit" passHref>
            <Button
              color="primary"
              sx={{
                px: 4,
                bgcolor: "primary.light",
              }}
            >
              Edit Profile
            </Button>
          </Link>
        }
      />
      <Box py={4}>
        {/*<H3 mb={2}>Product List</H3>*/}

        {/*<SearchArea*/}
        {/*  handleSearch={() => {}}*/}
        {/*  buttonText="Add Product"*/}
        {/*  handleBtnClick={() => {}}*/}
        {/*  searchPlaceholder="Search Product..."*/}
        {/*/>*/}

        <Card>
          <StyledScrollBar>
            <TableContainer
              sx={{
                minWidth: 900,
              }}
            >
              <Table>
                <TableHeader
                  order={order}
                  hideSelectBtn
                  orderBy={orderBy}
                  heading={tableHeading}
                  rowCount={products.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />

                <TableBody>
                  {filteredList.map((product, index) => (
                    <ProductRow product={product} key={index}/>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledScrollBar>

          <Stack alignItems="center" my={4}>
            <TablePagination
              onChange={handleChangePage}
              count={Math.ceil(products.length / rowsPerPage)}
            />
          </Stack>
        </Card>
      </Box>
    </CustomerDashboardLayout>

  );
}

export default ProductList;
