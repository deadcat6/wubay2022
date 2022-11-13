import {Card, Checkbox, Divider, FormControlLabel, Rating, TextField,} from "@mui/material";
import {FlexBetween} from "./flex-box";
import {H5, H6, Paragraph} from "./Typography";
import {useEffect, useState} from "react";

const ProductFilterCard = ({setFilter}) => {
  const [lowBound, setLowBound] = useState('');
  const [upBound, setUpBound] = useState('');
  const [rating, setRating] = useState({
    five: true,
    four: true,
    three: true,
    two: true,
    one: true,
  });
  const [cateState, setCateState] = useState({
    All: true,
    Textbook: false,
    Clothing: false,
    Grocery: false,
    Electronic: false,
    Furniture: false,
    Office: false,
    Other: false,
  });
  const {
    five,
    four,
    three,
    two,
    one
  } = rating;
  const {
    All,
    Textbook,
    Clothing,
    Grocery,
    Electronic,
    Furniture,
    Office,
    Other
  } = cateState;

  useEffect(() => {
    const {
      All,
      Textbook,
      Clothing,
      Grocery,
      Electronic,
      Furniture,
      Office,
      Other
    } = cateState;
    if (!All &&
      !Textbook &&
      !Clothing &&
      !Grocery &&
      !Electronic &&
      !Furniture &&
      !Office &&
      !Other) {
      setCateState({...cateState, All: true})
    }
    setFilter(cateState, rating, lowBound, upBound);

  }, [cateState, rating, upBound, lowBound])
  const handleLowBoundChange = (event) => {
    setLowBound(event.target.value);
  }
  const handleUpBoundChange = (event) => {
    setUpBound(event.target.value);
  }
  const handleRatingChange = (event) => {
    setRating({
      ...rating,
      [event.target.name]: event.target.checked,
    });
    const result = {
      ...rating,
      [event.target.name]: event.target.checked,
    }
  };
  const handleCateChange = (event) => {
    if (event.target.name === 'All') {
      setCateState({
        All: true,
        Textbook: false,
        Clothing: false,
        Grocery: false,
        Electronic: false,
        Furniture: false,
        Office: false,
        Other: false,
      });
    } else {
      setCateState({
        ...cateState,
        All: false,
        [event.target.name]: event.target.checked,
      });
    }
  };


  return (
    <Card
      sx={{
        p: "18px 27px",
        overflow: "auto",
      }}
      elevation={1}
    >
      <H6 mb={1.25}>Categories</H6>
      <FormControlLabel
        sx={{
          display: "flex",
        }}
        label={<Paragraph
          py={0.75}
          fontSize="14px"
          color="grey.600"
          className="cursor-pointer"
        >
          All Categories
        </Paragraph>}
        control={<Checkbox checked={All} onChange={handleCateChange} name="All"/>}
      />
      <FormControlLabel
        sx={{
          display: "flex",
        }}
        label={<Paragraph
          py={0.75}
          fontSize="14px"
          color="grey.600"
          className="cursor-pointer"
        >
          Textbook
        </Paragraph>}
        control={<Checkbox checked={Textbook} onChange={handleCateChange} name="Textbook"/>}
      />
      <FormControlLabel
        sx={{
          display: "flex",
        }}
        label={<Paragraph
          py={0.75}
          fontSize="14px"
          color="grey.600"
          className="cursor-pointer"
        >
          Grocery
        </Paragraph>}
        control={<Checkbox checked={Grocery} onChange={handleCateChange} name="Grocery"/>}
      />
      <FormControlLabel
        sx={{
          display: "flex",
        }}
        label={<Paragraph
          py={0.75}
          fontSize="14px"
          color="grey.600"
          className="cursor-pointer"
        >
          Clothing & Beauty
        </Paragraph>}
        control={<Checkbox checked={Clothing} onChange={handleCateChange} name="Clothing"/>}
      />
      <FormControlLabel
        sx={{
          display: "flex",
        }}
        label={<Paragraph
          py={0.75}
          fontSize="14px"
          color="grey.600"
          className="cursor-pointer"
        >
          Electronic & Entertainment
        </Paragraph>}
        control={<Checkbox checked={Electronic} onChange={handleCateChange} name="Electronic"/>}
      />
      <FormControlLabel
        sx={{
          display: "flex",
        }}
        label={<Paragraph
          py={0.75}
          fontSize="14px"
          color="grey.600"
          className="cursor-pointer"
        >
          Furniture & Household
        </Paragraph>}
        control={<Checkbox checked={Furniture} onChange={handleCateChange} name="Furniture"/>}
      />
      <FormControlLabel
        sx={{
          display: "flex",
        }}
        label={<Paragraph
          py={0.75}
          fontSize="14px"
          color="grey.600"
          className="cursor-pointer"
        >
          Office & School Supplies
        </Paragraph>}
        control={<Checkbox checked={Office} onChange={handleCateChange} name="Office"/>}
      />
      <FormControlLabel
        sx={{
          display: "flex",
        }}
        label={<Paragraph
          py={0.75}
          fontSize="14px"
          color="grey.600"
          className="cursor-pointer"
        >
          Other
        </Paragraph>}
        control={<Checkbox checked={Other} onChange={handleCateChange} name="Other"/>}
      />


      <Divider
        sx={{
          mt: 2,
          mb: 3,
        }}
      />

      <H6 mb={2}>Price Range</H6>
      <FlexBetween>
        <TextField placeholder={"min"} onChange={handleLowBoundChange} type="number" size="small" fullWidth/>
        <H5 color="grey.600" px={1}>-</H5>
        <TextField placeholder={"max"} onChange={handleUpBoundChange} type="number" size="small" fullWidth/>
      </FlexBetween>

      <Divider
        sx={{
          my: 3,
        }}
      />


      <H6 mb={2}>Ratings</H6>
      <FormControlLabel
        control={<Checkbox checked={five} onChange={handleRatingChange} name="five"/>}
        label={<Rating size="small" value={5} color="warn" readOnly/>}
        sx={{
          display: "flex",
        }}
      />
      <FormControlLabel
        control={<Checkbox checked={four} onChange={handleRatingChange} name="four"/>}
        label={<Rating size="small" value={4} color="warn" readOnly/>}
        sx={{
          display: "flex",
        }}
      />
      <FormControlLabel
        control={<Checkbox checked={three} onChange={handleRatingChange} name="three"/>}
        label={<Rating size="small" value={3} color="warn" readOnly/>}
        sx={{
          display: "flex",
        }}
      />
      <FormControlLabel
        control={<Checkbox checked={two} onChange={handleRatingChange} name="two"/>}
        label={<Rating size="small" value={2} color="warn" readOnly/>}
        sx={{
          display: "flex",
        }}
      /> <FormControlLabel
      control={<Checkbox checked={one} onChange={handleRatingChange} name="one"/>}
      label={<Rating size="small" value={1} color="warn" readOnly/>}
      sx={{
        display: "flex",
      }}
    />

      {/*<Divider*/}
      {/*  sx={{*/}
      {/*    my: 3,*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<H6 mb={2}>Colors</H6>*/}
      {/*<FlexBox mb={2} flexWrap="wrap" gap={1}>*/}
      {/*  {colorList.map((item) => (*/}
      {/*    <Box*/}
      {/*      flexShrink={0}*/}
      {/*      sx={{*/}
      {/*        width: 25,*/}
      {/*        height: 25,*/}
      {/*        bgcolor: item,*/}
      {/*        cursor: "pointer",*/}
      {/*        borderRadius: "50%",*/}
      {/*      }}*/}
      {/*      key={item}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</FlexBox>*/}
    </Card>
  );
};


export default ProductFilterCard;
