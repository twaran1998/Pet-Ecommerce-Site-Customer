import * as React from "react";
import { Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Avatar, Link } from "@material-ui/core";
import "./homepage.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    // maxWidth: 345,
    padding: 10,
    // margin: theme.spacing(2)
  },
  catGridItem: {
    borderRadius: "39% 34%",
    overflow: "hidden",
  },
  catCard: {
    height: "24vh",
    width:'80% !important',
    // width: "14vw",
    objectFit: "cover",
    borderRadius: "50%",
    //  width:'75%',
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      width:'100% !important',
      height: "18vh",
    },
  },
}));

function ShopByCategory() {
  const [categories, setCategories] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_APIURL}/getCategories`
        );
        // ,{
        //   headers:{
        //     Authorization: "Bearer " + (localStorage.getItem('token') != null ? localStorage.getItem('token').replaceAll('"', '') : '')
        //   }
        // });
        const data = await response.json();
        let catList = data.map((cat, index) => {
          //to remove uploads or public in image path beginning
          const url = `${cat.categoryImage.path}`.slice(7);

          const imgPath = `${process.env.REACT_APP_APIURL}/${url}`;
          // console.log(`image url for ${index}`, imgPath);
          let catWithImage = { ...data[index], imageUrl: imgPath };
          return catWithImage;
        });

        setCategories(catList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategories();
  }, []);

  return (
    <div
    id="shopByCategories"
      style={{
        padding: "1% 5% 0% 5%",
        backgroundColor: "#E6E6E6",
        margin: "-2vh 5vw 4vw 5vw",
      }}
    >
      <div className="d-flex flex-column text-center ">
        <div className="d-flex flex-column text-center mb-5">
          {/* <h4 className="text-secondary mb-3">Our Services</h4> */}
          <div className="display-6 mt-3">Shop By Category</div>
        </div>
      </div>
      {/* <h4 className="text-secondary mb-3">Shop by Category</h4> */}
      <Grid container spacing={2} justify="center" sx={{ mt: "10" }}>
        {categories.slice(0, 8).map((cat) => (
          <Grid
            className={classes.catGridItem}
            item
            xs={6}
            sm={6}
            md={4}
            lg={3}
            key={cat._id}
          >
            <Link href={`/getProducts?type=${cat.categoryName}`}>
              <Card
                className={classes.card}
                sx={{ boxShadow: "none", backgroundColor: "transparent" }}
              >
                <CardMedia
                  component="img"
                  // height="150vh"
                  // width='75%'
                  className={classes.catCard}
                  image={cat.imageUrl}
                  alt={cat.categoryName}
                />
                <CardContent style={{ textAlign: "center" }}>
                  <Typography>{cat.categoryName}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ShopByCategory;
