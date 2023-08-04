import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

/////////////////////////////////////////////
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    marginBottom: "50px",
    marginTop: "50px",
    boxShadow: "none",
    border: "1px solid grey",
    padding: "10px",
  },
  media: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    borderRadius: "50%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  },
  content: {
    margin: "auto",
    textAlign: "center",
  },
}));
////////////////////////////////////////////////

export default function SimplePaper() {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_APIURL}/getCategories`)
      .then((response) => {
        let catList = response.data.map((cat, index) => {
          //to remove uploads or public in image path beginning
          const url = `${cat.categoryImage.path}`.slice(7);

          const imgPath = `${process.env.REACT_APP_APIURL}/${url}`;
          const routeTo = `/getProducts?type=${cat.categoryName}`;
          let petWithImage = {
            ...response.data[index],
            imageUrl: imgPath,
            link: routeTo,
          };
          return petWithImage;
        });

        setCategories(catList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Typography sx={{ paddingTop: 5 }} variant="h5">
        {" "}
        Other Categories:{" "}
      </Typography>

      <Grid container spacing={3}>
        {categories.slice(0, 3).map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <a href={`${category.link}`} style={{textDecoration:'none'}}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={category.imageUrl}
                />

                <CardContent className={classes.content}>
                  <Typography variant="h5">{category.categoryName}</Typography>
                </CardContent>
              </Card>
            </a>
          </Grid>
        ))}
        <div sx={{right:0}}>
        <a href="/GetCategories/all">
          <h6> View more</h6>
        </a>
        </div>
      </Grid>
    </div>
  );
}
