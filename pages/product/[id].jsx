import {Container} from "@mui/material";
import MainLayout from "../components/MainLayout";
import ProductIntro from "./ProductIntro";
import {H2} from "../components/Typography";
import bazaarReactDatabase from "./bazaar-react-database";
import {useState} from "react";
// const StyledTabs = styled(Tabs)(({ theme }) => ({
//   minHeight: 0,
//   marginTop: 80,
//   marginBottom: 24,
//   borderBottom: `1px solid ${theme.palette.text.disabled}`,
//   "& .inner-tab": {
//     minHeight: 40,
//     fontWeight: 600,
//     textTransform: "capitalize",
//   },
// })); // ===============================================================

// ===============================================================
const ProductDetails = (props) => {
  // const { frequentlyBought, relatedProducts } = props;
  const [product, setProduct] = useState(bazaarReactDatabase[0]);
  // const [selectedOption, setSelectedOption] = useState(0);
  // const [relatedProducts, setRelatedProducts] = useState([]);
  // const [frequentlyBought, setFrequentlyBought] = useState([]);
  /**
   * Note:
   * ==============================================================
   * 1. We used client side rendering with dummy fake data for related products and frequently product
   * 2. Product details data is static data, we didn't call any rest api
   * 3. If you fetch data from server we recommended you to call getStaticProps function in below.
   *    The code is commented if want to call it just uncomment code and put the server url
   */

  // useEffect(() => {
  //   getRelatedProducts().then((data) => setRelatedProducts(data));
  //   getFrequentlyBought().then((data) => setFrequentlyBought(data));
  // }, []);

  const handleOptionClick = (_, value) => setSelectedOption(value);

  return (
    <MainLayout>
      <Container
        sx={{
          my: 4,
        }}
      >
        {product ? <ProductIntro product={product} /> : <H2>Loading...</H2>}
        {/*<ProductDescription />*/}
        {/*<StyledTabs*/}
        {/*  textColor="primary"*/}
        {/*  value={selectedOption}*/}
        {/*  indicatorColor="primary"*/}
        {/*  onChange={handleOptionClick}*/}
        {/*>*/}
        {/*  <Tab className="inner-tab" label="Description" />*/}
        {/*  <Tab className="inner-tab" label="Review (3)" />*/}
        {/*</StyledTabs>*/}


        {/*<Box mb={6}>*/}
        {/*  {selectedOption === 0 && }*/}
        {/*  {selectedOption === 1 && <ProductReview />}*/}
        {/*</Box>*/}

        {/*{frequentlyBought && (*/}
        {/*  <FrequentlyBought productsData={frequentlyBought} />*/}
        {/*)}*/}

        {/*<AvailableShops />*/}

        {/*{relatedProducts && <RelatedProducts productsData={relatedProducts} />}*/}
      </Container>
    </MainLayout>
  );
}; // export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = bazaarReactDatabase.slice(0, 2).map((pro) => ({ params: { id: pro.id } }));
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };
// export async function getStaticProps() {
//   const frequentlyBought = await getFrequentlyBought();
//   const relatedProducts = await getRelatedProducts();
//   return {
//     props: { frequentlyBought, relatedProducts },
//   };
// }

export default ProductDetails;
