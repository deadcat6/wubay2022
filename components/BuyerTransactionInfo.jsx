/* eslint-disable react-hooks/exhaustive-deps */
import {Avatar, Box, Button, Dialog, Grid, Rating} from "@mui/material";
import {H1, H2, H3, H6, Small} from "./Typography";
import ImageViewer from "react-simple-image-viewer";
import {useRouter} from "next/router";
import React, {useCallback, useState} from "react"; // import ImageViewer from "react-simple-image-viewer";
import {FlexBox, FlexRowCenter} from "./flex-box"; // ================================================================
import {bgcolor, border, borderRadius, compose, sizing, spacing, styled, typography,} from "@mui/system";
import NextImage from "next/image";
import {useSession} from "next-auth/react";
import Login from "./Login";

import {formatTime} from './formatTime';

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
const BuyerTransactionInfo = ({product, id}) => {
  const {data: session} = useSession()
  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => setDialogOpen(!dialogOpen);
  //console.log(product);
  const imagePath = product.imagePath;
  //console.log(imagePath);
  const router = useRouter();
  // const routerId = router.query.id;
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [rating, setRating] = useState(5);


  const checkSessions = () => {
    if (!session) {
      setDialogOpen(true);
      return false;
    }
    return true;
  }

  async function removeHandler() {
    const res = await fetch('/api/user/cancelOrder', {
      method: 'POST',
      body: JSON.stringify({userId: session.user.id, productId: id}),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    if (data) {
      await router.push('/user/orders')
    }
  }

  const handleRating = async () => {
    if (checkSessions()) {
      const res = await fetch('/api/user/setRating', {
        method: 'POST',
        body: JSON.stringify({
          userId: product.userId,
          productId: id,
          rating: rating
        }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      if (data) {
        await router.push('/user/orders')
      }

    }
  }
  const handleContact = async (e) => {
    if (checkSessions()) {
      e.preventDefault();
      const res = await fetch('/api/chat/newChat', {
        method: 'POST',
        body: JSON.stringify({
          userId: session.user.id,
          sellerId: product.userId,
        }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      await router.push(`/user/chats/${data.chatId}`)

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


  return (
    <>
      <Dialog
        open={dialogOpen}
        scroll="body"
        onClose={toggleDialog}
      >
        <Login/>
      </Dialog>

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
              <Small color={"grey.900"}>{new Date(product.updateTime).toDateString()}</Small>
            </FlexBox>
            <Box mb={3}>
              <H2 color="primary.main" mb={0.5} lineHeight="1">
                ${product.price}
              </H2>

              {/*<Box color="inherit">Stock Available</Box>*/}
            </Box>


            <FlexBox alignItems="center" mb={2}>
              Payment:
              <H6 ml={1}>{product.paymentMethod}</H6>
            </FlexBox>

            <FlexBox alignItems="center" mb={4}>
              <Box>Transaction Created Time:</Box>
              <H6 ml={1}>{formatTime(product.transaction.createdTime?.seconds * 1000)}</H6>
            </FlexBox>


            {product.transaction.state === 'Completed' ? (
              <>
                <FlexBox alignItems="center" mb={2}>
                  <H6 mr={1}>Your Transaction is</H6>
                  <StatusWrapper status={product.transaction.state}>{product.transaction.state}</StatusWrapper>
                </FlexBox>
                <FlexBox alignItems="center" mb={2}>

                  {product.rated && product.rated !== -1 ? (
                    <>
                      <H6 mr={2}>You already rated: </H6>
                      <Rating
                        size="large"
                        name="simple-controlled"
                        value={product.rated}
                        readOnly
                      />
                    </>
                  ) : (
                    <>
                      <H6 mr={2}>Please rate the buyer: </H6>
                      <Rating
                        size="large"
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                      />
                    </>
                  )}
                </FlexBox>


                { (!product.rated || product.rated === -1) &&(
                  <FlexBox alignItems="center" my={3}>
                    <Box lineHeight="1">
                      <BazaarButton
                        color="primary"
                        variant="contained"
                        onClick={handleRating}
                        sx={{
                          mb: 4.5,
                          px: "1.75rem",
                          height: 40,
                        }}
                      >
                        Submit
                      </BazaarButton>
                    </Box>
                  </FlexBox>
                )}
              </>
            ) : (
              <>
                <FlexBox alignItems="center" mb={2}>
                  <H3 mr={3}>Transaction State:</H3>
                  <StatusWrapper status={product.transaction.state}>{product.transaction.state}</StatusWrapper>
                </FlexBox>
                <FlexBox alignItems="center" my={3}>
                  <Box lineHeight="1">
                    <BazaarButton
                      color="primary"
                      variant="outlined"
                      onClick={removeHandler}
                      sx={{
                        mb: 4.5,
                        px: "1.75rem",
                        height: 40,
                      }}
                    >
                      CANCEL
                    </BazaarButton>
                  </Box>
                  <Box mx={2} lineHeight="1">
                    <BazaarButton
                      color="primary"
                      variant="contained"
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
                </FlexBox>
              </>

            )}

          </Grid>
        </Grid>
      </Box>
    </>
  );
};
const StatusWrapper = styled(Box)(({theme, status}) => {
  let color = theme.palette.grey[900];
  let backgroundColor = theme.palette.grey[200];

  if (status === "Accepted" || status === "Completed" || status === "Normal") {
    color = "rgb(51, 208, 103)";
    backgroundColor = "#E7F9ED";
  }

  if (status === "Rejected" || status === "Pending Payment" || status === "Urgent") {
    color = "#E94560";
    backgroundColor = "#FFEAEA";
  }

  if (status === "Shipment Processing") {
    color = "#feb840";
    backgroundColor = "#FFF8E5";
  }

  return {
    color,
    fontSize: 15,
    fontWeight: 600,
    backgroundColor,
    borderRadius: "8px",
    padding: "3px 12px",
    display: "inline-flex",
  };
});
export default BuyerTransactionInfo;
