import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SHeader from "../navbar/navbar";
import SFooter from "../footer/footer";
import { Link as RouterLink } from "react-router-dom";
import emptyCart from "./emptyCart.gif";
import "./cart.css";
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
import { AppContext } from "../../App";
import { useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { fontWeight, sizeHeight } from "@mui/system";
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPal from "../Checkout/Paypal";
import { saveCart } from "../../utilityFn/saveCart";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    paddingBottom: "-1em",
    margin: "10px",
    marginBottom: "-5em",
    position: "relative",
  },
  title: {
    position: "absolute",
    fontFamily: "calibri",
    fontWeight: "bold",
    marginLeft: "1em",
    marginTop: "0.5em",
    fontSize: "3rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "1em",
      fontSize: "2rem",
      marginTop: "1.7em",
      marginBottom: "1em",
    },
  },
  media: {
    height: 180,
    width: 150,
    margin: "10px",
  },
  button: {
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
    marginTop: "3.2em",
    [theme.breakpoints.down("sm")]: {
      marginTop: "7em",
      marginBottom: "2em",
      paddingTop: "2em",
      marginLeft: "3%",
    },
  },
  price: {
    position: "absolute",
    top: "70%",
    right: "1em",
    transform: "translateY(-50%)",
  },
  itemsCounter: {
    marginLeft: "1em",
  },
  deleteIcon: {
    position: "absolute",
    top: "0.5em",
    right: "1em",
  },
  pageBackground: {
    backgroundColor: "#EAEDED",
    minHeight: "100vh",
    // height:'auto'
  },
  smallerFont: {
    position: "absolute",
    fontSize: "1.2rem",
    marginTop: "-3em",
  },
  productName: {
    fontFamily: "sans-serif",
    marginLeft: "2em",
  },
  button: {
    marginTop: "8em",
    height: "4em",
    backgroundColor: "red",
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
  paypalBox: {
    marginTop: "3%",
  },
}));

const Cart = () => {
  const { buynow } = useParams();

  const [subTotl, setsubTotl] = useState(0);
  const classes = useStyles();
  const { setCartCount } = useContext(AppContext);
  const [user, setUser] = useState();
  // const [cartItems, setCartItems] = useState(
  //   JSON.parse(sessionStorage.getItem("cart")) || []

  // );

  // useEffect(() => {
  //   sessionStorage.setItem("cart", JSON.stringify(cartItems));
  // }, [cartItems]);

  const [cartItems, setCartItems] = useState([]);
  const [BuyNowData, setBuyNowData] = useState([]);
  //   JSON.parse(sessionStorage.getItem("cart")) || []
  // );

  const getCartWithImage = async (data) => {
    if (data.length > 0) {
      var cartList = data.map((cart, index) => {
        //to remove uploads or public in image path beginning
        const url = `${cart.productImage.path}`.slice(7);
        const imgPath = `${process.env.REACT_APP_APIURL}/${url}`;

        // console.log(`image url for ${index}`, imgPath);
        let cartWithImage = { ...data[index], imageUrl: imgPath };
        return {
          productId: cartWithImage._id,
          productName: cartWithImage.productName,
          productPrice: cartWithImage.productPrice,
          productImg: cartWithImage.imageUrl,
          Quantity: (cartWithImage.productQuantity == null || cartWithImage.productQuantity === undefined) ? 1 : cartWithImage.productQuantity ,
        };
      });
    } else {
      //Get item in session
      //cartList = JSON.parse(sessionStorage.getItem("cart"));
    }
    return cartList;
  };

  const calculatedSubTotal = (total) => {
    const cgst = 0.13;
    const subTotal = total + (total * cgst);
    return subTotal.toFixed(2);
  }
  useEffect(() => {
    if ((buynow != null || buynow != undefined) && buynow) {
      // console.log("buy now ", sessionStorage.getItem("buyNowCart"));

      const buyNowData = JSON.parse(sessionStorage.getItem("buyNowCart"));
      setBuyNowData(buyNowData);
      const url = `${buyNowData.productImage.path}`.slice(7);
      const imgPath = `${process.env.REACT_APP_APIURL}/${url}`;

      const buyNowList = [
        {
          productId: buyNowData._id,
          productName: buyNowData.productName,
          productPrice: buyNowData.productPrice,
          productImg: buyNowData.imageUrl,
          Quantity: buyNowData.productQuantity,
          imageUrl: imgPath,
        },
      ];
      const unitPrice  = buyNowList[0].productPrice;
      const qty = 1; //buyNowList[0].Quantity;    Will always be 1

     const subTotal = calculatedSubTotal(parseFloat(unitPrice) * qty);
     setsubTotl(parseFloat(subTotal).toFixed(2));

      setCartItems(buyNowList);
    } else {
      const userData = {
        userEmail:
          sessionStorage.userData === undefined
            ? null
            : JSON.parse(sessionStorage.userData).username,
      };

      setUser(userData);

      console.log("userData => ", userData);

      if (userData.userEmail != null) {
        const fetchUserCart = async () => {
          try {
            let response = await fetch(
              `${process.env.REACT_APP_APIURL}/getCart`,
              {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const data = await response.json();

            //Create cartWithImageArr
            const cartList = await getCartWithImage(data);

            const existingSessionStorage =    JSON.parse(sessionStorage.getItem("cart"))  || [];

            const cartFromDB =
              cartList === undefined || cartList === null ? existingSessionStorage : cartList;
            sessionStorage.setItem(
              "cart",
              JSON.stringify(cartFromDB)
            );

            const total = cartFromDB.reduce(
              (accumulator, item) => accumulator + (parseFloat(item.productPrice) *  item.Quantity),
              0
            );
            const subTotals = calculatedSubTotal(parseFloat(total));
            setsubTotl(subTotals);
            setCartItems(cartFromDB);
          } catch (error) {
            console.log(error);
          }
        };
        fetchUserCart();
      }
    }
  }, []);

  // Calculate subtotal 
  const totalPrice = cartItems.reduce(
    (accumulator, item) => accumulator + (parseFloat(item.productPrice) *  item.Quantity),
    0
  );

  const deleteItemFromCart = async (itemId, userData) => {
    console.log("Delete item from user => ", itemId, " ", userData);
    const updatedCart = {
      itemId: itemId,
      userData: userData,
    };
    try {
      let response = await fetch(
        `${process.env.REACT_APP_APIURL}/deleteFromCart`,
        {
          method: "POST",
          body: JSON.stringify(updatedCart),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      let cartList = data.map((cart, index) => {
        //to remove uploads or public in image path beginning
        const url = `${cart.productImage.path}`.slice(7);

        const imgPath = `${process.env.REACT_APP_APIURL}/${url}`;
        // console.log(`image url for ${index}`, imgPath);
        let cartWithImage = { ...data[index], imageUrl: imgPath };
        return cartWithImage;
      });

      setCartItems(cartList);
    } catch (error) {
      console.log(error);
    }
  };

  //Delete Item
  const handleDelete = async (index, itemId) => {
    if ((buynow != null || buynow != undefined) && buynow) {
      sessionStorage.removeItem("buyNowCart");
      setCartItems([]);
    } else {
      console.log("Cart in session = ", sessionStorage.getItem("cart"));
      console.log("Remove pId = ", itemId, " from sessionStorage");

      //remove item from cart
      const cartInSessionStrg = sessionStorage.getItem("cart");

      const updatedCart = JSON.parse(cartInSessionStrg).filter((prod) => {
        return prod.productId !== itemId;
      });
      setCartItems(updatedCart);
      sessionStorage.setItem("cart", JSON.stringify(updatedCart)); // Update the sessionStorage

      // console.log("item id = ", +itemId);

      // //call API to delete item from user's cart

      // await deleteItemFromCart(itemId, user);
      // const newCartItems = [...cartItems];
      // newCartItems.splice(index, 1);
      // setCartItems(newCartItems);
      // setCartCount(newCartItems.length);
      // sessionStorage.setItem("cart", JSON.stringify(newCartItems)); // Update the sessionStorage
    }
  };

  const goToPayment = () => {
    if (buynow != null || buynow != undefined){

      //Add code to make payment, api and everything
      alert('MAke payment, do code');
      const userObj = sessionStorage.getItem("buyNowCart");

    } else {
      const userObj = sessionStorage.getItem("userData");
      const isUserLogggedIn =
        userObj == null ? false : JSON.parse(userObj).isLoggedIn;

      if (isUserLogggedIn) {
        // window.location.href = "/payment";
        saveCart(sessionStorage.getItem("cart"))
          .then(() => {
            console.log("Cart Added clicked on checkout");
            // window.location.href = "/paypal";
          })
          .catch((err) => {
            console.log("Checkout clicked , Something went wrong.. ", err);
          });
      } else {
        let answer = window.confirm("You must login to continue");
        if (answer) {
          window.location.href = "/login";
        } else {
          window.location.href = "/cart";
        }
      }
    }
  };

  const redirectToProduct = (id) => {
    window.location.href = `/productDetail?id=${id}`;
  };
  return (
    <>
      <SHeader></SHeader>
      <Box className={classes.pageBackground}>
        <div className="d-flex flex-column text-center mb-3 pt-5">
          <h1 className="display-4 m-4">Your Cart</h1>
        </div>
        {cartItems.length > 0 ? (
          <Box mt={0}>
            <Grid container>
              <Grid item xs={12} sm={9}>
                {cartItems.map((item, index) => (
                  <Card className={classes.root} key={index}>
                    <Grid container className={classes.cartItem}>
                      <Grid item xs={12} sm={3}>
                        <a href={`/productDetail?id=${item.productId}`}>
                          <CardMedia
                            component="img"
                            image={item.productImg}
                            alt={item.productName}
                            className={classes.media}
                          />
                        </a>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <CardContent>
                          <Typography
                            variant="h5"
                            className={classes.productName}
                          >
                            <a
                              className="removeLinkDecoration"
                              href={`/productDetail?id=${item.productId}`}
                            >
                              {item.productName}
                            </a>
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                    <Typography variant="subtitle1" className={classes.price}>
                      {buynow != null || buynow !== undefined
                        ? `Quantity : 1 | Price: $${BuyNowData.productPrice}`
                        : `Quantity : ${item.Quantity} | Price: $${item.productPrice} | Total : ${setsubTotl}.toFixed(2)}`} 
                    </Typography>
                    <IconButton
                      edge="end"
                      color="inherit"
                      className={classes.deleteIcon}
                      onClick={() => handleDelete(index, item.productId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                ))}
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card className={classes.subtotalCard}>
                  <h5>Total {cartItems.length} Item(s) in Cart</h5>
                  <table className="myTable">
                    <tbody>
                      <tr>
                        <th>Amount:</th>
                        <td>
                          {" "}
                          {buynow != null || buynow !== undefined
                            ? `$${BuyNowData.productPrice}`
                            : `$${totalPrice.toFixed(2)}`}
                        </td>
                      </tr>
                      <tr>
                        <th>CGST:</th>
                        <td>13%</td>
                      </tr>
                      <tr>
                        <th>Subtotal:</th>
                        <td>
                          {buynow != null || buynow !== undefined
                            // ? `$${(
                            //     parseFloat(BuyNowData.productPrice) +
                            //     parseFloat(BuyNowData.productPrice) * 0.13
                            //   ).toFixed(2)}`
                            ? `$${subTotl}` : `$${subTotl}`
                            // : `$${(totalPrice + totalPrice * 1 * 0.13).toFixed(
                            //     2
                              // )}`
                              }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={goToPayment}
                    className={classes.button}
                  >
                    CheckOut
                  </Button> */}
                </Card>
                <PayPal buynow={buynow} subTotal ={subTotl}/>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <div className="emptyCartContainer">
            <img
              className="emptyCartImg"
              srcSet={emptyCart}
              alt="Page not found"
            />
            <p>Your cart is empty!</p>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Shop now
            </button>
          </div>
        )}
      </Box>
      <SFooter></SFooter>
    </>
  );
};

export default Cart;
