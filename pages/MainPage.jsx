import {Box, Card, Container, Grid, MenuItem, Pagination, TextField,} from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
import {FlexBetween, FlexBox} from "../components/flex-box";
import MainLayout from "../components/MainLayout";
import ProductFilterCard from "../components/ProductFilterCard";
import {H5, Paragraph, Span} from "../components/Typography";
import {useEffect, useState} from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import * as React from "react";
import {Fragment} from "react";
import ProductCard from "../components/ProductCard";
const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});

  let [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const count = Math.ceil(products.length / PER_PAGE);
  const productsData = usePagination(products, PER_PAGE);

  const handlePageChange = (e, p) => {
    setPage(p);
    productsData.jump(p);
  };


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
      //console.log(data.list)
      setLoading(false);
      //console.log(data.products)
    }
    getProducts().then().catch(e => {alert(e)});
  }, []); // Or [] if effect doesn't need props or state


  return loading ? (
    <MainLayout>
      <LoadingSpinner text='Loading...' />
    </MainLayout>
  ) : (
    <MainLayout>
      <Container
        sx={{
          mt: 4,
          mb: 6,
        }}
      >
        <Card
          elevation={1}
          sx={{
            mb: 4,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            p: {
              sm: "1rem 1.25rem",
              md: "0.5rem 1.25rem",
              xs: "1.25rem 1.25rem 0.25rem",
            },
          }}
        >
          <Box>
            <H5>Welcome to Wubay</H5>
            <Paragraph color="grey.600">{products.length}  results found</Paragraph>
          </Box>

          <FlexBox
            alignItems="center"
            columnGap={4}
            flexWrap="wrap"
            my="0.5rem"
          >
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Paragraph color="grey.600" whiteSpace="pre">
                Short by:
              </Paragraph>

              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Short by"
                defaultValue={sortOptions[0].value}
                sx={{
                  flex: "1 1 0",
                  minWidth: "150px",
                }}
              >
                {sortOptions.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

          </FlexBox>
        </Card>
        {/*here*/}

        <Grid container spacing={3}>
          <Grid
            item
            md={3}
            sx={{
              display: {
                md: "block",
                xs: "none",
              },
            }}
          >
            <ProductFilterCard />
          </Grid>

          <Grid item md={9} xs={12}>
            <Fragment>
              <Grid container spacing={3}>
                {productsData.currentData().map((item, ind) => (
                  <Grid item lg={4} sm={6} xs={12} key={ind}>
                    <ProductCard {...item} />
                  </Grid>
                ))}
              </Grid>

              <FlexBetween flexWrap="wrap" mt={4}>
                <Span color="grey.600">{products.length}  results found</Span>
                <Pagination page={page} count={count} variant="outlined" color="primary" onChange={handlePageChange} />
              </FlexBetween>
            </Fragment>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

const sortOptions = [
  {
    label: "Relevance",
    value: "Relevance",
  },
  {
    label: "Date",
    value: "Date",
  },
  {
    label: "Price Low to High",
    value: "Price Low to High",
  },
  {
    label: "Price High to Low",
    value: "Price High to Low",
  },
];

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}

export default MainPage;
