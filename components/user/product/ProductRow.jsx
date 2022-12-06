import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import {Avatar, Box, IconButton, styled, Switch, TableCell, TableRow} from "@mui/material";
// import BazaarSwitch from "components/BazaarSwitch";
import { FlexBox } from "../../flex-box";
import { Paragraph, Small } from "../../Typography";
// import currency from "currency";
import { useRouter } from "next/router";
import React, { useState } from "react";
// import {
//   CategoryWrapper,
//   StyledIconButton,
//   StyledTableCell,
//   StyledTableRow,
// } from "../StyledComponents"; // ========================================================================
const StyledSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-switchBase.MuiButtonBase-root": {
    backgroundColor: "transparent",
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.grey[400],
    "&:before, &:after": {
      width: 16,
      height: 16,
      top: "50%",
      content: '""',
      position: "absolute",
      transform: "translateY(-50%)",
    },
  },
  "& .MuiSwitch-thumb": {
    width: 16,
    height: 16,
    margin: "2px",
    boxShadow: "none",
    backgroundColor: theme.palette.grey[600],
  },
  "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
    backgroundColor: theme.palette.info.main,
  },
}));

const BazaarSwitch = (props) => {
  return <StyledSwitch {...props} />;
};
const CategoryWrapper = styled(Box)(({ theme }) => ({
  fontSize: 13,
  padding: "3px 12px",
  borderRadius: "16px",
  display: "inline-block",
  color: theme.palette.grey[900],
  backgroundColor: theme.palette.grey[200],
}));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[600],
  "& .MuiSvgIcon-root": {
    fontSize: 19,
  },
  ":hover": {
    color: theme.palette.info.main,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 14,
  paddingTop: 10,
  fontWeight: 600,
  paddingBottom: 10,
  color: theme.palette.grey[900],
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));
const StyledTableRow = styled(TableRow)(() => ({
  ":last-child .MuiTableCell-root": {
    border: 0,
  },
  "&.Mui-selected": {
    backgroundColor: "transparent",
    ":hover": {
      backgroundColor: "transparent",
    },
  },
}));
// ========================================================================
const ProductRow = ({ product, removeHandler }) => {
  //console.log(product)
  const { title, imagePath, id, published } = product; // state
  const state = product.transaction.state;
  const updateTime = new Date(product.updateTime).toDateString();
  const router = useRouter();
  const [productPublish, setProductPublish] = useState(published);

  async function publishedHandler() {
    const response = await fetch('/api/product/setProductPublish', {
      method: 'POST',
      body: JSON.stringify({
        productId: id,
        published: !productPublish,
      }),
      headers: {'Content-Type': 'application/json'}
    });
    setProductPublish((state) => !state)
    const product_data = await response.json();
  }



    return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar
            src={imagePath[0]}
            sx={{
              borderRadius: "8px",
            }}
          />
          <Box>
            <Paragraph>{title}</Paragraph>
            <Small color="grey.600">#{id}</Small>
          </Box>
        </FlexBox>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Small>{updateTime}</Small>
      </StyledTableCell>
      <StyledTableCell align="left">
        <CategoryWrapper>{state}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={productPublish}
          onChange={publishedHandler}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/user/products/${id}`)}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton onClick={() => router.push(`/product/${id}`)}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete onClick={() => {removeHandler(id)}}/>
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ProductRow;
