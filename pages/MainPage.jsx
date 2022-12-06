import {Box, Card, Container, Grid, MenuItem, Pagination, TextField,} from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
import {FlexBetween, FlexBox} from "../components/flex-box";
import MainLayout from "../components/MainLayout";
import ProductFilterCard from "../components/ProductFilterCard";
import {H5, Paragraph, Span} from "../components/Typography";
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import algoliasearch from "algoliasearch";
import {useRouter} from "next/router";


const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  const [sort, setSort] = useState()
  const [queryOptions, setQueryOptions] = useState({})


  const client = algoliasearch('EZDCHMNGZZ', '29fe64c0094ab2b5eccfa2320560b310');
  const index = client.initIndex('wubay');

  const router = useRouter();

  let [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const count = products ? Math.ceil(products.length / PER_PAGE) : 1;
  const productsData = usePagination(products, PER_PAGE);

  const handlePageChange = (e, p) => {
    setPage(p);
    productsData.jump(p);
  };

  useEffect(() => {
    const getProducts = async () => {
      setPage(1);
      productsData.jump(1);
      const opt = getRanking(sort);
      //console.log(opt, queryOptions)
      setLoading(true);

      setProducts()
      index.setSettings(opt).wait().then(() => {
        index.search('', queryOptions).then(({hits}) => {
          //console.log(hits);
          setProducts(hits)

        }).catch(err => console.log(err));
      });
      setLoading(false);

    };
    const timer = setTimeout(async () => {
      await getProducts();
    }, 800)
    return () => clearTimeout(timer)


  }, [sort, queryOptions]);


  const sortOptions = [
    {
      label: "Relevance",
      value: "Relevance",
    },
    {
      label: "Latest",
      value: "Latest",
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
  const getRanking = (sort) => {
    let opt = {};
    if (sort === "Latest") {
      opt = {
        customRanking: [
          'desc(updateTime)'
        ]
      }
    }
    if (sort === "Price Low to High") {
      opt = {
        customRanking: [
          'asc(price)'
        ]
      }
    }
    if (sort === "Price High to Low") {
      opt = {
        customRanking: [
          'desc(price)'
        ]
      }
    }
    return opt;
  }

  const setFilter = (cateState, rating, lowBound, upBound) => {

    let queryOptions = {}
    if (lowBound !== '' && upBound !== '') {
      queryOptions = {
        ...queryOptions,
        filters: `price <= ${upBound} AND price >= ${lowBound}`,
      }
    } else if (lowBound !== '') {
      queryOptions = {
        ...queryOptions,
        filters: `price >= ${lowBound}`,
      }
    } else if (upBound !== '') {
      queryOptions = {
        ...queryOptions,
        filters: `price <= ${upBound}`,
      }
    }
    let facetFilters = []
    if (!cateState.All) {
      //console.log(cateState, rating, lowBound, upBound)
      let cateFilters = [];
      if (cateState.Clothing) {
        cateFilters.push('category:Clothing')
      }
      if (cateState.Electronic) {
        cateFilters.push('category:Electronic')
      }
      if (cateState.Furniture) {
        cateFilters.push('category:Furniture')
      }
      if (cateState.Grocery) {
        cateFilters.push('category:Grocery')
      }
      if (cateState.Office) {
        cateFilters.push('category:Office')
      }
      if (cateState.Other) {
        cateFilters.push('category:Other')
      }
      if (cateState.Textbook) {
        cateFilters.push('category:Textbook')
      }
      facetFilters.push(cateFilters);

    }
    let ratingFilters = [];
    if (rating.five) {
      ratingFilters.push('sellerRating:5')
    }
    if (rating.four) {
      ratingFilters.push('sellerRating:4')
    }
    if (rating.three) {
      ratingFilters.push('sellerRating:3')
    }
    if (rating.two) {
      ratingFilters.push('sellerRating:2')
    }
    if (rating.one) {
      ratingFilters.push('sellerRating:1')
    }
    if (ratingFilters.length > 0) {
      facetFilters.push(ratingFilters);

    }
    facetFilters.push(["published:true"])
    queryOptions = {
      ...queryOptions,
      facetFilters: facetFilters,

    }
    setQueryOptions(queryOptions)




  };


  return loading ? (
    <MainLayout>
      <LoadingSpinner text='Loading...'/>
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
            <H5>Welcome to WuBay</H5>
            <Paragraph color="grey.600">{products ? products.length : 0} results found</Paragraph>
          </Box>

          <FlexBox
            alignItems="center"
            columnGap={4}
            flexWrap="wrap"
            my="0.5rem"
          >
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Paragraph color="grey.600" whiteSpace="pre">
                Sort by:
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
                  <MenuItem value={item.value} key={item.value} onClick={() => setSort(item.value)}>
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
            <ProductFilterCard setFilter={setFilter}/>
          </Grid>
          {
            productsData && productsData.currentData() ? (
              <Grid item md={9} xs={12}>
                <Fragment>
                  <Grid container spacing={3}>
                    {productsData.currentData().map((item, ind) => {
                      //console.log("item" + JSON.stringify(item))
                      return (
                        <Grid item lg={4} sm={6} xs={12} key={ind}>
                          <ProductCard {...item} />
                        </Grid>
                      )
                    })}
                  </Grid>
                  <FlexBetween flexWrap="wrap" mt={4}>
                    <Span color="grey.600">{products?.length} results found</Span>
                    <Pagination page={page} count={count} variant="outlined" color="primary"
                                onChange={handlePageChange}/>
                  </FlexBetween>
                </Fragment>
              </Grid>

            ) : (
              <Grid item md={9} xs={12}>
                <Box>
                  <LoadingSpinner text='Loading...'/>
                </Box>
              </Grid>

            )
          }
        </Grid>

      </Container>
    </MainLayout>
  );
};


const usePagination = (data, itemsPerPage) => {

  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data?.length / itemsPerPage);

  function currentData() {
    if (isNaN(currentPage)) {
      const begin = 0;
      const end = begin + itemsPerPage;
      //console.log("currentData" + begin + end + data)
      return data?.slice(begin, end);

    }
    let begin = (currentPage - 1) * itemsPerPage;
    begin = begin < 0 ? 0 : begin;
    const end = begin + itemsPerPage;
    //console.log("currentData" + begin + end + data?.slice(begin, end))

    return data?.slice(begin, end);

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

  return { next, prev, jump, currentData, currentPage, maxPage};
}

export default MainPage;
