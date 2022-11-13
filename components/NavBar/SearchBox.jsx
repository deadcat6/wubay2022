/* eslint-disable react-hooks/exhaustive-deps */
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import {Box, Card, MenuItem, MenuList, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";
import {debounce} from "@mui/material/utils";
// import BazaarMenu from "components/BazaarMenu";
import {FlexBox} from "components/flex-box";
import {useCallback, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import algoliasearch from "algoliasearch"; // styled components
// also used in the GrocerySearchBox component
export const SearchOutlinedIcon = styled(SearchOutlined)(({theme}) => ({
  color: theme.palette.grey[600],
  marginRight: 6,
})); // also used in the GrocerySearchBox component

export const SearchResultCard = styled(Card)(() => ({
  zIndex: 99,
  top: "100%",
  width: "100%",
  position: "absolute",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
}));
const DropDownHandler = styled(FlexBox)(({theme}) => ({
  whiteSpace: "pre",
  borderTopRightRadius: 300,
  borderBottomRightRadius: 300,
  borderLeft: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
}));

const SearchBox = () => {
  const [category, setCategory] = useState("All Categories");
  const [resultList, setResultList] = useState([]);
  const parentRef = useRef();
  const router = useRouter();
  const handleCategoryChange = (cat) => () => setCategory(cat);
  const [text, setText] = useState([]);
  const [focusItem, setFocusItem] = useState(false);


  const search = debounce((e) => {
    const queryString = e.target?.value;
    const client = algoliasearch('EZDCHMNGZZ', '77c86a52b3cf624d2f51fcf5dea03f00');
    const index = client.initIndex('wubay');
    const list = [];
    index.search(queryString).then(({hits}) => {
      //console.log(hits);
      hits.map(hit => {
        list.push(hit.title)

      })
      //console.log(list)
      if (!queryString) setResultList([]);
      else setResultList(list);
    });
  }, 200);
  const handleInput = useCallback((event) => {
    setFocusItem(false)
    setText(event.target.value)
    event.persist();
    search(event);
  }, []);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setResultList([])
      setText("")
      router.push(`/search/${event.target?.value}`);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusItem(true)
    }
  }


  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);
  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{
        ref: parentRef,
      }}
    >
      <TextField
        onFocus={() => {
        }}
        fullWidth
        value={text}
        variant="outlined"
        color="warning"
        placeholder="Searching anything you want in WUBay..."
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        InputProps={{
          sx: {
            height: 44,
            paddingRight: 0,
            borderRadius: 300,
            color: "grey.600",
            overflow: "hidden",
            backgroundColor: "neutral.main",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "grey.600",
            },
          },
          startAdornment: <SearchOutlinedIcon fontSize="small"/>,
        }}
      />

      {!!resultList.length && (
        <SearchResultCard elevation={2}>
          <MenuList
            autoFocusItem={focusItem}
          >
            {resultList.map((item, index) => {
                if (index < 6) {
                  return (<MenuItem key={index} onClick={() => router.push(`/search/${item}`)}>{item}</MenuItem>)
                }
              }
            )}
          </MenuList>
        </SearchResultCard>
      )}
    </Box>
  );
};


export default SearchBox;
