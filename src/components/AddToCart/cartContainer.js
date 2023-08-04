// import React from "react";
// import { Navigate } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import SHeader from "../navbar/navbar";
// import {
//   Card,
//   CardActionArea,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Button,
//   Typography,
//   Grid,
//   Box,
//   Link,
// } from "@material-ui/core";
// import CartProduct from "./cart";

// const useStyles = makeStyles({
//   root: {
//     marginTop: 100,
//     paddingBottom: 20,
//     width: "75%",
//     margin: "10px",
//   },
//   media: {
//     height: "100px",
//     width: "100px",
//     margin: "auto",
//   },
//   button: {
//     margin: "10px",
//   },
// });

// const Cart = () => {
//   const classes = useStyles();

//   const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

//   const goToPayment = () => {
//     window.location.href = "/payment";
//   };
//   return (
//     <>
//       <SHeader></SHeader>
//       <CartProduct></CartProduct>
//       <Button variant='contained' color='primary' onClick={goToPayment}>
//         CheckOut
//       </Button>
//     </>
//   );
// };

// export default Cart;
