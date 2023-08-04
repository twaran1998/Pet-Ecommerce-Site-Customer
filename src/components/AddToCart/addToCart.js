// //Add to cart
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Pdf from "react-to-pdf";
import { Navigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SHeader from "../navbar/navbar";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Box,
  Link,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { fontWeight, sizeHeight } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    paddingBottom: "-1em",
    margin: "10px",
    marginBottom: "-5em",
    position: "relative",
  },
  title: {
    fontFamily: "calibri",
    fontWeight: "bold",
    fontSize: "2rem",
    marginTop: "2rem",
  },
  media: {
    height: 180,
    width: 150,
    margin: "10px",
  },

  subtotalCard: {
    width: "auto",
    height: 200,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "1em",
    marginTop: "6.2em",
    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
      marginBottom: "2em",
      paddingTop: "2em",
    },
  },

  pageBackground: {
    // minHeight: "110vh",
    minWidth: "85vh",
    marginTop: 100,
  },

  productName: {
    fontFamily: "sans-serif",
  },

  cartItem: {
    marginBottom: "-3em",
  },
  separator: {
    borderBottom: "1px solid #ccc",
    marginBottom: "1em",
    marginTop: "1em",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  downloadInvoiceBtn: {
    marginTop: "2%",
    backgroundColor: "#0000",
    borderRadius: "3%",
    padding: "2%",
  },
  swagimalsLogo: {
    marginTop:'2rem',
    width: "15%",
  },
}));
const ref = React.createRef();

const firstName = new Date();

function ReportGenerator() {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState(
    JSON.parse(sessionStorage.getItem("cart")) || []
  );

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [userd, setUserd] = useState(
    JSON.parse(sessionStorage.getItem("userData")) || []
  );

  useEffect(() => {
    sessionStorage.setItem("userData", JSON.stringify(userd));
  }, [userd]);

  // Calculate subtotal
  const totalPrice = cartItems.reduce(
    (accumulator, item) => accumulator + parseFloat(item.productPrice),
    0
  );

  const handleDelete = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };
  const goToPayment = () => {
    const userObj = sessionStorage.getItem("userData");
    const isUserLogggedIn =
      userObj == null ? false : JSON.parse(userObj).isLoggedIn;

    if (isUserLogggedIn) {
      window.location.href = "/payment";
    } else {
      let answer = window.confirm("You must login to continue");
      if (answer) {
        window.location.href = "/login";
      } else {
        window.location.href = "/cart";
      }
    }
  };
  return (
    <>
     <nav style={{ padding: "2rem",cursor:'pointer' }}>
        <a href='/'>Go Back</a>
      </nav>
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div ref={ref}>
        {/* <img
          className={classes.swagimalsLogo}
          srcSet={process.env.PUBLIC_URL + "/swagimalsLogo.svg"}
        ></img> */}

        <div className={classes.title}>Swagimals Invoice</div>

        <Box display="flex" justifyContent="left">
          {/* <Typography variant='body1'>Name: Twaran Sahai</Typography> */}
          <Box marginLeft={4}>
            <Typography variant="body1">Email: {userd.username}</Typography>
          </Box>
          {/* <Box marginLeft={4}>
            <Typography variant="body1">Date: {firstName}</Typography>
          </Box> */}
        </Box>
        {/* <Box marginTop={2}>
          <Box display='flex' justifyContent='center'>
            <Typography variant='body1'>Phone No.: 123443432</Typography>
            <Box marginLeft={4}>
              <Typography variant='body1'>
                Invoice No.: {Math.floor(Math.random() * 100000) + 40}
              </Typography>
            </Box>
          </Box>
        </Box> */}

        <Box className={classes.pageBackground}>
          <Box mt={4}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Tax(13%)</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>${item.productPrice}</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        {" "}
                        ${(item.productPrice * 1 * 0.13).toFixed(2)}
                      </TableCell>
                      {/* <TableCell>{item.quantity}</TableCell> */}
                      <TableCell>
                        {/* ${(item.productPrice * item.quantity * 1.13).toFixed(2)} */}
                        ${(item.productPrice * 1 * 1.13).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3}>
                      <strong style={{ fontSize: "1.2em" }}>
                        Subtotal ({cartItems.length} Item)
                      </strong>
                    </TableCell>
                    <tableCell></tableCell>
                    <TableCell
                      style={{ fontSize: "1.2em", alignItems: "center" }}
                    >
                      <strong>${(totalPrice * 1.13).toFixed(2)}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pdf targetRef={ref} filename={`${firstName}_invoice`}>
            {({ toPdf }) => (
              <button className={classes.downloadInvoiceBtn} onClick={toPdf}>
                Download Invoice
              </button>
            )}
          </Pdf>
        </div>
      </div>
      {/* username _ invoice.pdf */}
    </div>
    </>
  );
}

export default ReportGenerator;
