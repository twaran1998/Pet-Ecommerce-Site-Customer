import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "@mui/material";
import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import './cat.css';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    padding:10,
    margin: theme.spacing(2),
  },
}));

function CatGrid(props) {
  const [petsCategories, setPetsCategories] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_APIURL}/getPetCategories?type=${props.petType}`);
        const data = await response.json();

        let petCatList = data.map((cat, index) => {

          //to remove uploads or public in image path beginning
          const url = `${cat.categoryImage.path}`.slice(7);
          
          const imgPath = `${process.env.REACT_APP_APIURL}/${url}`;
          // console.log(`image url for ${index}`, imgPath);
          let petCatImage = { ...data[index], imageUrl: imgPath };
          return petCatImage;
        });
        setPetsCategories(petCatList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPets();
  }, []);
  // ///////////////////////////////////  useEffect Pets ////////////////////////////////////////////////////////
  return (
    <div className="myContainer">      
      <Typography
        variant="h5"
        sx={{
          paddingTop: 10,
          paddingBottom: 5
        }}
      >
        Sometimes ,the best medicine is unconditional love from the pet.
      </Typography>
      {/* <FormControl style={{width:'200px', float:'right'}}>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="sortBy"
        >
          <MenuItem value={10}>Filter by Name: A-Z</MenuItem>
          <MenuItem value={20}>Filter by Price : High to low</MenuItem>
          <MenuItem value={30}>Filter by Price : Low to High</MenuItem>
        </Select>
      </FormControl> */}
      <Grid container spacing={2} justify="center"   sx={{ mt:'10', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'}}>
        {petsCategories.map((petCategory) => (
          <Grid item xs={12} sm={6} md={4} key={petCategory._id}>
             <Link style={{textDecoration:'none'}}
                href={`/getProducts?type=${petCategory.categoryName}`}
              >
            <Card className={classes.card}>
              <CardMedia
                component="img"
                height="200"
                sx={{objectFit:'cover'}}
                image={petCategory.imageUrl}
                alt={petCategory.categoryName}
              />
              <CardContent style={{ textAlign: "center" }}>
                <Button variant="contained" style={{color: 'rgb(249 249 249)','backgroundColor': 'rgb(220, 53, 69)','padding': '3% 7% 3% 7%'}}>
                  {petCategory.categoryName}
                </Button>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CatGrid;
