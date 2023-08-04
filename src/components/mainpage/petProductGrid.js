import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ImgMediaCard from "./categoryCard";
import MoreCategories from "./otherCategory";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import SortByDropdown from "../common/sortByDropdown";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PetProductGrid(props) {
  const [prodData, setprodData] = useState([]);
  const [isSorted, setisSorted] = useState(false);
  const [dogFood, setDogFood] = useState(false);
  const [catFood, setCatFood] = useState(false);
  const [birdFood, setBirdFood] = useState(false);

  useEffect(() => {
    setprodData(props.data);
    setisSorted(false);
  }, [props, isSorted]);

  useEffect(() => {
    filterProducts();
  }, [dogFood, catFood, birdFood]);

  const filterProducts = async () => {
    let filterURL = `${process.env.REACT_APP_APIURL}/filter?`;
    let categories = [];
    if (dogFood) categories.push("Dog%20Food");
    if (catFood) categories.push("Cat%20Food");
    if (birdFood) categories.push("Bird%20Food");

    if (categories.length > 0) {
      filterURL += "category=" + categories.join(",");
      let res = await fetch(filterURL);
      let filteredData = await res.json();
      setprodData(filteredData);
    } else {
      setprodData(props.data);
    }
  };

  const handleDogFood = async () => {
    setDogFood(!dogFood);
   
  };

  const handleCatFood = async () => {
    setCatFood(!catFood);
  
  };

  const handleBirdFood = async () => {
    setBirdFood(!birdFood);
  
  };

  //callback function
  const handleSortedData = (sortedData) => {
    setprodData(sortedData);
    setisSorted(true); //to force rerender on receiving productData from callback
  };

  return (
    <div>
      <div className="d-flex flex-column text-center ">
        <div className="d-flex flex-column text-cente">
          {/* <h4 className="text-secondary mb-3">Our Services</h4> */}
          <div className="display-6 mt-3">All Products</div>
        </div>
      </div>
      <SortByDropdown
        sort={props.sortBy}
        data={prodData}
        callbackForSortedData={handleSortedData}
      ></SortByDropdown>


      <Box sx={{ flexGrow: 1, paddingTop: 2}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Item  sx={{backgroundColor:'#ba2a25',color:'#FFF'}}>
              <Typography varient="h2"> Pet Type </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox sx={{color:'#FFF'}} onClick={handleDogFood} />}
                  label="Dogs"
                />
                <FormControlLabel
                  control={<Checkbox  sx={{color:'#FFF'}} onClick={handleCatFood} />}
                  label="Cats"
                />
                 <FormControlLabel
                  control={<Checkbox  sx={{color:'#FFF'}} onClick={handleBirdFood} />}
                  label="Birds"
                />
              </FormGroup>
              <Typography varient="h2"> Category </Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox  sx={{color:'#FFF'}} />} label="Shoes" />
                <FormControlLabel control={<Checkbox  sx={{color:'#FFF'}} />} label="Wearable" />
              </FormGroup>
            </Item>
          </Grid>
          <Grid item xs={12} md={9} style={{border:'0px solid grey'}}>
              <ImgMediaCard data={prodData}></ImgMediaCard>
          </Grid>
        </Grid>
      </Box>
      <MoreCategories></MoreCategories>
    </div>
  );
}
