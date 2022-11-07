/* eslint-disable react-hooks/exhaustive-deps */
import {Box, Card, IconButton, Rating, styled} from "@mui/material";
import {Favorite} from "@mui/icons-material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import BazaarCard from "components/BazaarCard";
// import BazaarRating from "components/BazaarRating";
// import LazyImage from "components/LazyImage";
// import ProductViewDialog from "components/products/ProductViewDialog";
import {H2, H3} from "./components/Typography";
// import {useAppContext} from "contexts/AppContext";
import Link from "next/link";
import React, {useCallback, useState} from "react";
import {FlexBox} from "./components/flex-box";
import {bgcolor, borderRadius, compose, spacing, typography} from "@mui/system";
import NextImage from "next/image";

const ProductCard = ({
                        id,
                        title,
                        price,
                        imagePath,
                        sellerRating,
                        hoverEffect,
                      }) => {

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleIsFavorite = () => setIsFavorite((fav) => !fav);

  // const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);
  // const cartItem = state.cart.find((item) => item.id === id);

  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>

        <HoverIconWrapper className="hover-box">

          <IconButton onClick={toggleIsFavorite}>
            {isFavorite ? (
              <Favorite color="primary" fontSize="large"/>
            ) : (
              <FavoriteBorder fontSize="large" color="disabled"/>
            )}
          </IconButton>
        </HoverIconWrapper>

        <Link href={`/product/${id}`}>
          <a>
            <LazyImage
              src={imagePath[0]}
              width={0}
              height={0}
              layout="responsive"
              alt={title}
            />
          </a>
        </Link>
      </ImageWrapper>

      <ContentWrapper>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            <Link href={`/product/${id}`}>
              <a>
                <H3
                  mb={1}
                  title={title}
                  fontSize="14px"
                  fontWeight="600"
                  className="title"
                  color="text.secondary"
                >
                  {title}
                </H3>
              </a>
            </Link>

            {
              <BazaarRating value={sellerRating || 0} color="warn" readOnly/>
            }

            {/*{showProductSize && (*/}
            {/*  <Span color="grey.600" mb={1} display="block">*/}
            {/*    300ml*/}
            {/*  </Span>*/}
            {/*)}*/}

            {/*<FlexBox alignItems="center" gap={1} mt={0.5}>*/}


            {/*{!!discount && (*/}
            {/*  <Box color="grey.600" fontWeight="600">*/}
            {/*    <del>{price?.toFixed(2)}</del>*/}
            {/*  </Box>*/}
            {/*)}*/}
            {/*</FlexBox>*/}
          </Box>

          <FlexBox
            // width="30px"
            alignItems="center"
            className="add-cart"
            // flexDirection="column-reverse"
          >
            <Box fontWeight="600" color="primary.main">
              <H2
                mb={1}
                title={price}
                fontSize="25px"
                fontWeight="600"
                className="title"
                // color="red"
              >
                ${price}
              </H2>
            </Box>
            {/*  <Button*/}
            {/*    color="primary"*/}
            {/*    variant="outlined"*/}
            {/*    sx={{*/}
            {/*      padding: "3px",*/}
            {/*    }}*/}
            {/*    onClick={handleCartAmountChange({*/}
            {/*      id,*/}
            {/*      price,*/}
            {/*      imagePath,*/}
            {/*      name: title,*/}
            {/*      qty: (cartItem?.qty || 0) + 1,*/}
            {/*    })}*/}
            {/*  >*/}
            {/*    <Add fontSize="small" />*/}
            {/*  </Button>*/}

            {/*  {!!cartItem?.qty && (*/}
            {/*    <Fragment>*/}
            {/*      <Box color="text.primary" fontWeight="600">*/}
            {/*        {cartItem?.qty}*/}
            {/*      </Box>*/}

            {/*      <Button*/}
            {/*        color="primary"*/}
            {/*        variant="outlined"*/}
            {/*        sx={{*/}
            {/*          padding: "3px",*/}
            {/*        }}*/}
            {/*        onClick={handleCartAmountChange({*/}
            {/*          id,*/}
            {/*          price,*/}
            {/*          imagePath,*/}
            {/*          name: title,*/}
            {/*          qty: (cartItem?.qty || 0) - 1,*/}
            {/*        })}*/}
            {/*      >*/}
            {/*        <Remove fontSize="small" />*/}
            {/*      </Button>*/}
            {/*    </Fragment>*/}
            {/*  )}*/}
          </FlexBox>
        </FlexBox>
      </ContentWrapper>
    </StyledBazaarCard>
  );
};

const LazyImage = styled(({borderRadius, ...rest}) => (
  <NextImage {...rest} />
))(compose(spacing, borderRadius, bgcolor));
const BazaarRating = styled(Rating)(compose(spacing, typography));
BazaarRating.defaultProps = {
  fontSize: "1.25rem",
};
const BazaarCard = styled(({hoverEffect, children, ...rest}) => (
  <Card {...rest}>{children}</Card>
))(({theme, hoverEffect}) => ({
  borderRadius: "8px",
  overflow: "unset",
  transition: "all 250ms ease-in-out",
  "&:hover": {
    boxShadow: hoverEffect ? theme.shadows[3] : "",
  },
}));
BazaarCard.defaultProps = {
  hoverEffect: false,
};
const StyledBazaarCard = styled(BazaarCard)(() => ({
  height: "100%",
  margin: "auto",
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  ":hover": {
    "& .hover-box": {
      opacity: 1,
    },
  },
}));
const ImageWrapper = styled(Box)(({theme}) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const HoverIconWrapper = styled(Box)(({theme}) => ({
  zIndex: 2,
  top: "7px",
  opacity: 0,
  right: "15px",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
}));
const ContentWrapper = styled(Box)(() => ({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));
export default ProductCard;
