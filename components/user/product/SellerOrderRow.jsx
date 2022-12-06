import {Delete, ManageAccounts, RemoveRedEye} from "@mui/icons-material";
import {Avatar, Box, IconButton, styled, Switch, TableCell, TableRow} from "@mui/material";
import {FlexBox} from "../../flex-box";
import {H6, Paragraph, Small} from "../../Typography";
import {useRouter} from "next/router";
import React from "react";

const SellerOrderRow = ({ product, removeHandler }) => {
  const { title, imagePath, id, published, paymentMethod } = product; // state
  const state = product.transaction.state;
  const updateTime = new Date(product.updateTime).toDateString();
  const router = useRouter();

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
        <H6>{paymentMethod}</H6>
      </StyledTableCell>

      <StyledTableCell align="left">
        <StatusWrapper status={state}>{state}</StatusWrapper>
      </StyledTableCell>

      <StyledTableCell align="center">

        <StyledIconButton onClick={() => router.push(`/user/products/transaction/${id}`)}>
          <ManageAccounts />
        </StyledIconButton>

      </StyledTableCell>
    </StyledTableRow>
  );
};

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
    fontSize: 25,
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

const StatusWrapper = styled(Box)(({ theme, status }) => {
  let color = theme.palette.grey[900];
  let backgroundColor = theme.palette.grey[200];

  if (status === "Accepted" || status === "Completed" || status === "Normal") {
    color = "rgb(51, 208, 103)";
    backgroundColor = "#E7F9ED";
  }

  if (status === "Rejected" || status === "Pending Payment" || status === "Urgent") {
    color =  "#E94560";
    backgroundColor = "#FFEAEA";
  }

  if (status === "Shipment Processing") {
    color = "#feb840";
    backgroundColor = "#FFF8E5";
  }

  return {
    color,
    fontSize: 12,
    fontWeight: 600,
    backgroundColor,
    borderRadius: "8px",
    padding: "3px 12px",
    display: "inline-flex",
  };
});
export default SellerOrderRow;
