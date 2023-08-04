import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));



function CategoryProduct() {

  let petCard;
  const [category, setCategory] = useState([
    {
      categoryName: "",
      categoryPet: "",
      categoryImage: "",
      categoryBanner: "",
      categoryDesc: "",
    },
  ]);

  const [pet, setPet] = useState([
    {
      petName: "",
      petPrice: "",
      petBreed: "",
      petImage: "",
      petRating: "",
    },
  ]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_APIURL}/getCategories`)
      .then((res) => res.json())
      .then((jsonRes) => setCategory(jsonRes));
  }, []);

  useEffect(() => {
    console.log(category);
  }, [category]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_APIURL}/getPets`)
      .then((res) => res.json())
      .then((jsonRes) => setPet(jsonRes));
  }, []);

  useEffect(() => {
    console.log(pet);
  }, [pet]);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_APIURL}/api/getCategories`)
  //     .then((res) => {
  //       res.json()
  //     }).then((jsonRes) => {
  //       setCategory(jsonRes);
  //       fetch(`${process.env.REACT_APP_APIURL}/api/getPets`).then(pets => {
  //         pets.json().then(p => {
  //           setPet(p);
  //         }).catch(err => console.log('errow while setting pet state'))
  //       })
  //     }).catch((err)=> {
  //       console.log('Error ', err);
  //     })},[])

  // useEffect(() => {
  //   console.log(category);
  // }, [category]);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_APIURL}/api/getPets`)
  //     .then((res) => res.json())
  //     .then((jsonRes) => setPet(jsonRes));
  // }, []);

  // useEffect(() => {
  //   console.log(pet);
  // }, [pet]);


  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 40,
        }}
      >
        Sometimes ,the best medicine is unconditional love from the pet.
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="sortBy"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Typography
        variant="h5"
        sx={{
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        {/* {console.log('categpory', category)} */}

        {category.map((c) => {
          return (
            <>
              <p>{c.categoryPet}</p>
              <hr></hr>
            </>
          );
        })}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(1)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>
                {" "}
                <Card sx={{ maxWidth: 345 }}>
                  {pet.map((p) => {
                    return (
                      <CardMedia
                        sx={{ borderRadius: 2 }}
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={p.petImage}
                      />
                    );
                  })}
                  <Button size="large">
                    {pet.map((p) => {
                      return (
                        <>
                          <hr></hr>
                          <p>{p.petBreed}</p>
                        </>
                      );
                    })}
                  </Button>
                </Card>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default CategoryProduct;
