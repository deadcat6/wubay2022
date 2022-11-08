/* eslint-disable react-hooks/exhaustive-deps */
import {Avatar, Box, Button, Grid, Rating} from "@mui/material";
import {H1, H2, H3, H6, Small} from "./Typography";
import Link from "next/link";
import ImageViewer from "react-simple-image-viewer";
import {useRouter} from "next/router";
import React, {useCallback, useState} from "react"; // import ImageViewer from "react-simple-image-viewer";
import {FlexBox, FlexRowCenter} from "./flex-box"; // ================================================================
import {bgcolor, border, borderRadius, compose, sizing, spacing, styled, typography,} from "@mui/system";
import NextImage from "next/image";
import emailjs from "@emailjs/browser";
import {useSession} from "next-auth/react";

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
const ProductInfo = ({product, id}) => {
  const {data: session} = useSession()

  //console.log(product);
  const imagePath = product.imagePath;
  //console.log(imagePath);
  const router = useRouter();
  // const routerId = router.query.id;
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleContact = (e) => {
      e.preventDefault();
      let emailData = {
        to_name: product.username,
        from_name: session.user.name,
        item_name: product.title,
        from_email: session.user.email,
        reply_to: product.userEmail
      };
      let send = prompt(
        "Buyer: " + emailData.from_name +
        " \nSeller: " + emailData.to_name +
        " \nItem: " + emailData.item_name +
        " \nBuyer email: " + emailData.from_email +
        " \nto: " + emailData.reply_to +
        ".\nEnter CONFIRM to send.");
      if (send === "CONFIRM") {
        emailjs.send('service_32765vj', 'template_2es1tce', emailData, 'iNXQcfJgGe4A7EoEe')
          .then((result) => {
            alert("Email Sent!");
          }, (error) => {
            //console.log(error.text);
          });
      }
  }

  const handleImageClick = (ind) => () => {
    setSelectedImage(ind);
  };
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  async function orderHandler() {
    const response = await fetch('/api/user/addOrder', {
      method: 'POST',
      body: JSON.stringify({
        userId: session.user.id,
        productId: id,
      }),
      headers: {'Content-Type': 'application/json'}

    });
    await response.json();
    await router.push('/user/orders')
  }
  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={6}>
            <LazyImage
              width={300}
              alt={product.title}
              height={300}
              loading="eager"
              objectFit="contain"
              src={imagePath[selectedImage]}
              onClick={() => openImageViewer(imagePath.indexOf(imagePath[selectedImage]))}
            />
            {isViewerOpen && (
             <ImageViewer
               src={imagePath}
               onClose={closeImageViewer}
               currentIndex={currentImage}
               backgroundStyle={{
                 backgroundColor: "rgba(0,0,0,0.9)",
                 zIndex: 1501,
               }}
             />
            )}
          </FlexBox>

          <FlexBox overflow="auto">
            {imagePath.map((url, ind) => (
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
                mr={ind === imagePath.length - 1 ? "auto" : "10px"}
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
          <H1 mb={0}>{product.title}</H1>
          <FlexBox alignItems="center" mb={2}>
            <Small color={"grey.900"} >{new Date(product.updateTime).toDateString()}</Small>
          </FlexBox>
          <Box mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              ${product.price.toFixed(2)}
            </H2>

            {/*<Box color="inherit">Stock Available</Box>*/}
          </Box>
          <FlexBox alignItems="center" mb={2}>
            <Box>Category:</Box>
            <H6 ml={1}>{product.category}</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box>Sold By:</Box>
            {/*<Link href="/shops/fdfdsa">*/}
              <a>
                <H6 ml={1}>{product.username}</H6>
              </a>
            {/*</Link>*/}
            <Box mx={1} lineHeight="1">
              <BazaarRating
                color="warn"
                fontSize="1.25rem"
                value={product.sellerRating}
                readOnly
              />
            </Box>
          </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box>Email:</Box>
            <H6 ml={1}>{product.userEmail}</H6>
          </FlexBox>


          <FlexBox alignItems="center" mb={2}>
            Payment:
            <H6 ml={1}>{product.paymentMethod}</H6>
          </FlexBox>

          <Box mb={2}>
            <H3 mb={0}>Description:</H3>
            <Box>
              <H6 >{product.description}</H6>
            </Box>
          </Box>

          <FlexBox alignItems="center" my={3}>
            <Box  lineHeight="1">
              <BazaarButton
                color="primary"
                variant="outlined"
                onClick={handleContact}
                sx={{
                  mb: 4.5,
                  px: "1.75rem",
                  height: 40,
                }}
              >
                Contact seller
              </BazaarButton>
            </Box>
            <Box mx={2} lineHeight="1">
              <BazaarButton
                color="primary"
                variant="contained"
                onClick={orderHandler}
                sx={{
                  mb: 4.5,
                  px: "1.75rem",
                  height: 40,
                }}
              >
                Order
              </BazaarButton>
            </Box>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductInfo;
