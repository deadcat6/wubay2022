import * as React from 'react';
import Box from "@mui/system/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      contrastText: "#fff" //button text white instead of black
    },
    background: {
      default: "#394764"
    }
  }
});
const FilterContainer = () => {
  return (
    <Box
      px={1.5}
      py={1}
      // ml={3}
      //my={3}
      sx={{
        //margin: 3,
        max_width: 200,
        //width: 300,
        // height: 300,
        backgroundColor: 'rgba(233,231,231,0.31)',

      }}
    >
      <Stack spacing={0} alignItems="left" justifyContent="center">
        <ThemeProvider theme={theme}>
          <h3>New Releases</h3>
          <Box px={1} py={0}>
            <Stack spacing={0} alignItems="left" justifyContent="center">
              <Button size="medium" style={{justifyContent: "flex-start"}}>Last 7 Days</Button>
              <Button size="medium" style={{justifyContent: "flex-start"}}>Last 30 Days</Button>
              <Button size="medium" style={{justifyContent: "flex-start"}}>Last 60 Days</Button>
              <Button size="medium" style={{justifyContent: "flex-start"}}>Last 90 Days</Button>
            </Stack>
          </Box>
          <h3>Price</h3>
          <Box px={1} py={0}>
            <Stack spacing={0} alignItems="left" justifyContent="center">
              <Button size="medium" style={{justifyContent: "flex-start"}}>$0 to $10</Button>
              <Button size="medium" style={{justifyContent: "flex-start"}}>$10 to $100</Button>
              <Button size="medium" style={{justifyContent: "flex-start"}}>$100 to $200</Button>
              <Button size="medium" style={{justifyContent: "flex-start"}}>$200 to $500</Button>
              <Button size="medium" style={{justifyContent: "flex-start"}}>Over $500</Button>
            </Stack>
          </Box>
          <h3>Customer Reviews</h3>
          <Box px={1} py={0}>
            <Stack spacing={0} alignItems="left" justifyContent="center">
              <Button size="medium" style={{justifyContent: "flex-start"}}>5 Star</Button>
              <Button size="medium" style={{justifyContent: "flex-start"}}>4 Star</Button>
              <Button size="medium" style={{justifyContent: "flex-start"}}>3 Star</Button>
              <Button size="medium" style={{justifyContent: "flex-start"}}>2 Star</Button>
              <Button size="medium" style={{justifyContent: "flex-start"}}>1 Star</Button>
            </Stack>
          </Box>
        </ThemeProvider>

      </Stack>

    </Box>
  );
}
export default FilterContainer;
