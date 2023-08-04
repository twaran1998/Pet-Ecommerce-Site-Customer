import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Rating } from "@mui/material";
import SuccessModal from "../common/modal";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "@mui/material";
import { saveCart } from "../../utilityFn/saveCart";
import { ZoomIn } from "@material-ui/icons";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";

import MoreCats from "../mainpage/otherCategory";

import SHeader from "../header/header";
import SFooter from "../footer/footer";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    paddingBottom: 20,
    width: "100%",
  },
  media: {
    height: 400,
    width: 400,
    objectFit: "cover",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  pageBread: {
    marginTop: "5%",
    marginBottom: "2%",
    a: {
      textDecoration: "none",
      color: "#000",
    },
  },
  bodyDesc:{
    textAlign:'justify'
  },
  addToCartBtn: {
    backgroundColor: "red",
    color: "#FFF",
    fontWeight: "bold",
    padding: "3%",
    width: "18vw",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      marginTop: "2vh",
    },
  },
}));

const ProductDetails = ({ setshowLoginWidget }) => {
  const [products, setproducts] = useState([]);
  const [value, setValue] = useState(3);

  const [number, setNumber] = useState("");
  const location = useLocation();
  const prodId = new URLSearchParams(location.search).get("id");
  const [selectedValue, setSelectedValue] = useState(1); //QUANTITY
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [User, setUser] = useState();

  useEffect(() => {
    const userSessionData = sessionStorage.getItem("userData");
    if (userSessionData == null || userSessionData == undefined) {
    } else {
      setUser(JSON.parse(userSessionData));
    }
  }, []);

  const onModalClose = () => {
    //  window.location.href = "/";
    setModalOpen(false);
  };
  const handlesChanges = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleChange = (event) => {
    setNumber(event.target.value);
  };
  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();

  const handleBuyNow = (product) => {
    console.log("Buy now ", product);

    //Replace this to sessionStorage and pay
    // sessionStorage.removeItem('cart');
    sessionStorage.setItem("buyNowCart", JSON.stringify(product));
    // handleBuyNowClick();
    //And login
    const sessionUserData = sessionStorage.getItem("userData");

    if (sessionUserData !== undefined && sessionUserData !== null) {
      const email = JSON.parse(sessionUserData).username;
      if (email !== null && email !== undefined) {
        window.location.href = "/cart/buynow";
      } else {
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }
  };
  const handleAddToCart = async (products) => {
    try {
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

      const item = {
        productId: products._id,
        productName: products.productName,
        productPrice: products.productPrice,
        productImg: products.imageUrl,
        Quantity: selectedValue, //static qty
        productTotal: products.productPrice * selectedValue,
      };

      cart.push(item);

      if (User.userEmail === null) {
        console.log("User = ", User);
        sessionStorage.setItem("cart", JSON.stringify(cart));
        // saveCart(sessionStorage.getItem("cart"))
        // .then(() => {
        // console.log('Jas - Item added ');
        setTimeout(() => {
          setModalTitle("Item added to cart");
          setModalContent(
            <>
              If you want to go to the cart for checkout,{" "}
              <RouterLink to="/Cart" onClick={onModalClose}>
                click here
              </RouterLink>{" "}
              otherwise, you can keep exploring more of our offerings!
            </>
          );
          setModalOpen(true);
        }, 500);
      } else {
        sessionStorage.setItem("cart", JSON.stringify(cart));
        saveCart(sessionStorage.getItem("cart"))
          .then(() => {
            // console.log('Jas - Item added ');
            setTimeout(() => {
              setModalTitle("Item added to cart");
              setModalContent(
                <>
                  If you want to go to the cart for checkout,{" "}
                  <RouterLink to="/Cart" onClick={onModalClose}>
                    click here
                  </RouterLink>{" "}
                  otherwise, you can keep exploring more of our offerings!
                </>
              );
              setModalOpen(true);
            }, 500);
          })
          .catch((err) => {
            console.log("Jas - Item NOT added ");
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userData = {
      userEmail:
        sessionStorage.getItem["userData"] === undefined
          ? null
          : sessionStorage.getItem["userData"].username,
    };

    setUser(userData);

    const fetchproducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_APIURL}/getProducts/${prodId}`
        );
        const data = await response.json();

        const url = `${data.productImage.path}`.slice(7);

        const imgPath = `${process.env.REACT_APP_APIURL}/${url}`;

        setproducts({ ...data, imageUrl: imgPath });
      } catch (error) {
        console.log(error);
      }
    };
    fetchproducts();
  }, [prodId]);

  return (
    <>
      <SHeader></SHeader>
      <div className="container">
        <div className={classes.pageBread}>
          <a href="/getProducts?type=all">Product</a> <ArrowForwardIcon /> $
          {products.productName != null
            ? products.productName.slice(0, 30)
            : ""}
        </div>
        <div className={classes.root} key={products._id}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sm={6} lg={6}>
              <CardMedia
                className={classes.media}
                image={products.imageUrl}
                title={products.productName}
              />
              + Hover to zoom image
            </Grid>

            <Grid item xs={12} md={6} sm={6} lg={6}>
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <Typography gutterBottom variant="h4" component="h1">
                    {products.productName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Rating
                    name="my-rating"
                    value={products.productRating}
                    size="large"
                    onChange={handleRatingChange}
                    readOnly
                  />
                </Grid>
                <Grid item   className={classes.bodyDesc}>
                  <Typography
                    variant="body"                    
                    color="textSecondary"
                  
                    // sx={{ textAlign: "justify" }}
                  >
                    {products.productDesc}
                  </Typography>{" "}
                </Grid>
                <Grid item    className={classes.bodyDesc}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                 
                    // sx={{ textAlign: "justify" }}
                  >
                    {products.productDescription}
                  </Typography>{" "}
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" style={{ borderRadius: 20 }}>
                    <InputLabel style={{ borderRadius: 20 }}>Qty</InputLabel>
                    <Select value={selectedValue} onChange={handlesChanges}>
                      {[...Array(5).keys()].map((num) => (
                        <MenuItem key={num} value={num + 1}>
                          {num + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    <strong>
                      ${(products.productPrice * selectedValue).toFixed(2)}
                    </strong>
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid item xs={12} md={12} sm={12} lg={12}> */}
              {/* <Grid item xs={12} md={6} sm={6} lg={6}> */}
              <div class="row">
                <div className="col-xs-12 col-sm-6 col-lg-6">
                  <Button
                    variant="contained"
                    size="SMALL"
                    className={classes.addToCartBtn}
                    onClick={() => handleAddToCart(products)}
                  >
                    ADD TO CART
                  </Button>
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-6">
                  <Button
                    variant="contained"
                    size="SMALL"
                    className={classes.addToCartBtn}
                    onClick={() => handleBuyNow(products, setshowLoginWidget)}
                  >
                    BUY NOW
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
          {/* </Grid> */}

          <MoreCats></MoreCats>
        </div>
      </div>

      <SFooter></SFooter>
      <SuccessModal
        open={modalOpen}
        handleClose={onModalClose}
        title={modalTitle}
        message={modalContent}
      />
    </>
  );
};

export default ProductDetails;
