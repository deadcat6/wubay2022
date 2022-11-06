/* eslint-disable react-hooks/exhaustive-deps */
import {Avatar, Box, Button, Grid, Rating} from "@mui/material";
import {H1, H2, H3, H6} from "../components/Typography";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useCallback, useState} from "react"; // import ImageViewer from "react-simple-image-viewer";
import {FlexBox, FlexRowCenter} from "../components/flex-box"; // ================================================================
import {bgcolor, border, borderRadius, compose, sizing, spacing, styled, typography,} from "@mui/system";
import NextImage from "next/image";

const LazyImage = styled(({borderRadius, ...rest}) => (
  <NextImage {...rest} />
))(compose(spacing, borderRadius, bgcolor));

const BazaarAvatar = styled(Avatar)(
  compose(spacing, typography, sizing, border)
);
const BazaarButton = styled(Button)({
  minWidth: 0,
  minHeight: 0,
});
const BazaarRating = styled(Rating)(compose(spacing, typography));
BazaarRating.defaultProps = {
  fontSize: "1.25rem",
};

// ================================================================
const ProductIntro = ({product}) => {
  const {id, price, title, imgGroup} = product;
  const router = useRouter();
  const routerId = router.query.id;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  // const {state, dispatch} = useAppContext();
  // const cartList = state.cart;
  // const cartItem = cartList.find(
  //   (item) => item.id === id || item.id === routerId
  // );

  const handleImageClick = (ind) => () => {
    setSelectedImage(ind);
  }; // const openImageViewer = useCallback((index) => {
  //   setCurrentImage(index);
  //   setIsViewerOpen(true);
  // }, []);
  // const closeImageViewer = () => {
  //   setCurrentImage(0);
  //   setIsViewerOpen(false);
  // };

  const handleCartAmountChange = useCallback(
    (amount) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          price,
          qty: amount,
          name: title,
          imgUrl: imgGroup[0],
          id: id || routerId,
        },
      });
    },
    []
  );
  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={6}>
            <LazyImage
              width={300}
              alt={title}
              height={300}
              loading="eager"
              objectFit="contain"
              src={product.imgGroup[selectedImage]} // onClick={() => openImageViewer(imgGroup.indexOf(imgGroup[selectedImage]))}
            />
            {/* {isViewerOpen && (
             <ImageViewer
               src={imgGroup}
               onClose={closeImageViewer}
               currentIndex={currentImage}
               backgroundStyle={{
                 backgroundColor: "rgba(0,0,0,0.9)",
                 zIndex: 1501,
               }}
             />
            )} */}
          </FlexBox>

          <FlexBox overflow="auto">
            {imgGroup.map((url, ind) => (
              <FlexRowCenter
                key={ind}
                width={64}
                height={64}
                minWidth={64}
                bgcolor="white"
                border="1px solid"
                borderRadius="10px"
                ml={ind === 0 ? "auto" : 0}
                style={{
                  cursor: "pointer",
                }}
                onClick={handleImageClick(ind)}
                mr={ind === imgGroup.length - 1 ? "auto" : "10px"}
                borderColor={
                  selectedImage === ind ? "primary.main" : "grey.400"
                }
              >
                <BazaarAvatar src={url} variant="square" height={40}/>
              </FlexRowCenter>
            ))}
          </FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={2}>{title}</H1>

          <FlexBox alignItems="center" mb={2}>
            <Box>Brand:</Box>
            <H6 ml={1}>Xiaomi</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating
                color="warn"
                fontSize="1.25rem"
                value={4}
                readOnly
              />
            </Box>
            <H6 lineHeight="1">(50)</H6>
          </FlexBox>

          <Box mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              ${price.toFixed(2)}
            </H2>
            <Box color="inherit">Stock Available</Box>
          </Box>
          <Box>
            <H3 mb={2}>Specification:</H3>
            <Box>
              Brand: Beats <br/>
              Model: S450 <br/>
              Wireless Bluetooth Headset <br/>
              FM Frequency Response: 87.5 – 108 MHz <br/>
              Feature: FM Radio, Card Supported (Micro SD / TF) <br/>
              Made in China <br/>
            </Box>
          </Box>
          <BazaarButton
            color="primary"
            variant="contained"
            onClick={handleCartAmountChange(1)}
            sx={{
              mb: 4.5,
              px: "1.75rem",
              height: 40,
            }}
          >
            Add to Cart
          </BazaarButton>


          <FlexBox alignItems="center" mb={2}>
            <Box>Sold By:</Box>
            <Link href="/shops/fdfdsa">
              <a>
                <H6 ml={1}>Mobile Store</H6>
              </a>
            </Link>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;
