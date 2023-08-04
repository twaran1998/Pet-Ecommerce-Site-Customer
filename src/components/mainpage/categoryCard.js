import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { Link, Rating } from "@mui/material";
import ProductDetails from "../productDetails/productDetails";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "auto",
    textAlign: "center",
  },
  media: {
    // height: 200,
    height:'20vh',
    // width: 200,
    margin: "auto",
    width : '60% !important'
  },
  button: {
    margin: "8px",
  },
});


//For displaying products
export default function ImgMediaCard(props) {
  const [products, setproducts] = useState([]);
  const classes = useStyles();

  // const handleAddToCart = (productId) => {
  //   // console.log(`Product ID ${productId} was added to the cart.`);
  //   // TODO: Implement your add to cart logic here.
  // };

  //console.log('product data =' , props);

  useEffect(() => {
    setproducts(props.data);
  }, [props]);

  return (
    <Grid id="prodGrid" container spacing={2} justify="center">
      {/* {console.log("Product data in return =", products)} */}
      {products !== [] || products !== undefined || products !== null ? (
        products.map((product) => (
          <Grid item xs={6} sm={6} md={4} key={product._id}>
            <Card className={classes.root}>
              <Link style={{textDecoration:'none', color:'#000'}}
                href={`http://localhost:3000/productDetail?id=${product._id}`}
              >
                <CardMedia
                  component="img"
                  image={product.imageUrl}
                  alt={product.productName}
                  className={classes.media}
                />
                <CardContent>
                  {/* <Typography variant="h6">{product.productName.slice(0,18)}</Typography> */}
                  <div title={product.productName}>{product.productName.slice(0,15)}</div>
                  <Rating
                    name="customized-5"
                    defaultValue={product.productRating}
                    max={5}
                    readOnly
                  />
                  <Typography variant="subtitle1" style={{marginTop:'2%'}}>
                    Price: ${product.productPrice}
                  </Typography>
                  <Button
                    variant="contained"
                    // color="primary"                    
                    style={{marginTtop: '16px',
                      backgroundColor: '#d5b7b7',
                      color: '#000',marginTop:'15%'}}
                    // onClick={() => handleAddToCart(product._id)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.root}>
        <h4>No products yet</h4>
        </Card>
        </Grid>
      )}
        
    </Grid>
  );
}
