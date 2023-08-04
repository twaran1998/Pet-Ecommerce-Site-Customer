import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

import { useState, useEffect } from "react";
export default function SortByDropdown(props) {
  const [sortCriteria, setsortCriteria] = useState("nameAsc");
  const [productData, setproductData] = useState([]);

  useEffect(() => {
    setproductData(props.data);
  }, [props.data]);

  //Sort by
  function sortDataFn(productData, e) {
    console.log("Change value sort by = ", e.target.value);

    let sortCriteria = e.target.value;
    switch (sortCriteria) {
      case "nameAsc":
        productData.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "nameDesc":
        productData.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      case "priceAsc":
        productData.sort((a, b) => a.productPrice - b.productPrice);
        break;
      case "priceDesc":
        productData.sort((a, b) => b.productPrice - a.productPrice);
        break;
      default:
        console.log("Invalid sort option.");
    }
    props.callbackForSortedData(productData);
    // return productData;
  }

  return (
    <div>
      <Box sx={{ paddingTop: 10 }}>
        <FormControl style={{ width: "200px", float: "right" }}>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="sortBy"
            onChange={(e) => {
              sortDataFn(productData, e);
            }}
          >
            <MenuItem value={"nameAsc"}>Filter by Name: A-Z</MenuItem>
            <MenuItem value={"nameDesc"}>Filter by Name: Z-A</MenuItem>
            <MenuItem value={"priceDesc"}>
              Filter by Price : High to low
            </MenuItem>
            <MenuItem value={"priceAsc"}>
              Filter by Price : Low to High
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
