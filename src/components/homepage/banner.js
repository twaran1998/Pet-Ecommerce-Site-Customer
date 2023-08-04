import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-scroll";
import { Container, Typography, Grid, Box, Button } from "@material-ui/core";
import "./homepage.css";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#b80000",
    //theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(8, 0),
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
  knowMoreBtn: {
    // background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
    borderRadius: 10,
    border: 0,
    color: "white",
    // padding: '0 30px',
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    textTransform: "uppercase",
    fontWeight: "bold",
    marginTop: "4%",
    width: "10vw",
    border: "1px solid #FFF",
    [theme.breakpoints.down("sm")]: {
      width: "40vw",
      marginLeft: "25vw",
    },
  },
  hideIt: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid item xs={12} md={6} lg={12}>
              <div className="bannerTitle">
                Shop with us and achieve great offers online !
              </div>
            </Grid>
            <Grid item md={6} lg={12}>
              <Typography
                variant="body1"
                gutterBottom
                className={classes.hideIt}
              >
                We as Swagimals aim to provide the best quality products for our
                furry friends. Explore our website and sign up to our newsletter
                to never miss a deal{" "}
              </Typography>
              <Link to="shopByCategories" smooth={true}>
                <Button className={classes.knowMoreBtn}>Explore</Button>
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <img
              className={classes.image}
              src="https://images.unsplash.com/photo-1561438774-1790fe271b8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1413&q=80"
              alt="Happy dogs"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
