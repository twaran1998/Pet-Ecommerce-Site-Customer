import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme();
// https://developers.google.com/identity/gsi/web/reference/js-reference


async function saveCart(cart) {
  const userCart = JSON.parse(cart);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userEmail =
    userData != null && userData != undefined ? userData.username : null;
  //cart with only productId & quantity

  console.log('usserData == > ',userCart);

  const myCart = userCart.map((item) => {
    // const {[keyToRemove]:_, ...cart} = item;
    console.log('item = ', item);
    let expectedFormat = {
      [item.productId] : {
        Quantity : item.Quantity
      }
    }
    console.log('expectedFormat ', expectedFormat);
    // return item.productId;
    return expectedFormat;
  });

  console.log('myCart = ', myCart);
  const userCartObj = {
    username: userEmail,
    userProducts: myCart,
  };
  console.log("userCartObj = ", userCartObj);
  console.log(
    "stringed = ",
    JSON.stringify({
      userCart: userCartObj,
    })
  );

  try {
    let res = await fetch(`${process.env.REACT_APP_APIURL}/saveCart`, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }), //else will give request {} in server
      body: JSON.stringify({
        userCart: userCartObj,
      }),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      console.log("Cart added to DB");
      window.location.href = "/";
    } else {
      console.log("Cart not added to DB");
    }
  } catch (err) {
    console.log("Failed to add cart to DB ", err);
  }
}

 const saveCartOnLogin = async() => {
    console.log("login clicked and saving cart to DB now");
    try{
    const setCart = await saveCart(sessionStorage.getItem("cart"));
    console.log('Added cart to DB');
    return true
    }catch(err){
      console.log('Error adding cart to DB');
      return false;
    }
};


async function checkUser(userCred) {
 
    try {
      let res = await fetch(`${process.env.REACT_APP_APIURL}/api/checkValidUser`, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }), //else will give reuest {} in server
        body: JSON.stringify({
          userData: userCred,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        if (!resJson.user) {
          alert('User not found');
          return false;
        } else {
          console.log("user found");
          const loggedInUser = {
            isLoggedIn: true,
            username:
              localStorage.getItem("user".firstName) == null
                ? userCred.email
                : null,
          };
  
          const userObj = JSON.stringify(loggedInUser);
          sessionStorage.setItem("userData", userObj);
          // await saveCartOnLogin();   
          // window.location.href="/PayPal";
          window.history.go(-2);
          // window.location.href='/cart/buynow';
          return true;
        }
      } else {
        console.log("user not found");
        alert("Login failed");
        return false;
      }
    } catch (err) {
      console.log("Failed to Login ", err);
      return true;
    }
  }

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("firstName"),
      password: data.get("userPswd"),
    });
    const user = {
      email: data.get("email"),
      password: data.get("userPswd"),
    };

    //check user credentials
    checkUser(user);
  };

  const { handleGoogle, loading, error } = useFetch(
    `${process.env.REACT_APP_APIURL}/auth/login`
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "signin_with",
        shape: "pill",
      });

      // google.accounts.id.prompt() is used to automatically ask the user to sign in immediately they open your web page. It can be placed in the root file or the login page.
      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>     
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",   
            }}
          >
            <Typography component="h1" variant="h5" color='#000'>
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="userPswd"
                label="Password"
                type="password"
                id="password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <a href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </a>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        //   paddingBottom:3
          padding:5
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
      </main>
      <footer></footer>
    </>
  );
};

export default Login;
