
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// https://developers.google.com/identity/gsi/web/reference/js-reference

const SignUp = () => {
  

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignup, setisSignup] = useState(false);


  async function addUser(userData) {
    try {
      let res = await fetch(`${process.env.REACT_APP_APIURL}/api/addUser`, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }), //else will give reuest {} in server
        body: JSON.stringify({
          userData: userData,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200 && resJson.status)  {
        console.log("User added");        
        const loggedInUser = {
          isLoggedIn : true,
          username : (localStorage.getItem('user'.firstName) == null ? userData.firstName : null),
          email : (localStorage.getItem('user'.email) == null ? userData.email : null)
        };
        const userObj = JSON.stringify(loggedInUser);
        sessionStorage.setItem('userData',userObj);
        alert('user added')
        setisSignup(true);
        window.location.href = "/login";
        
      } else {
        const msg = `${resJson.message}`
        console.log("user not added ",msg);
        alert(msg);
        setisSignup(false);
      }
    } catch (err) {
      console.log("Failed to add user ", err);
      setisSignup(false);
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    // Log form data to console
    // console.log("Name: ", formData.get("fName"));
    const newUser = ({
    firstName : formData.get("fName"),
    lastName : formData.get("lName"),
    email : formData.get("email"),
    userPswd : formData.get("pswd"),
    userRole : 2, //Customer = 2, admin = 1
    isUserActive : 1,
    });
    
    console.log(JSON.stringify(newUser));

    addUser(newUser);

    // alert("Added");
  };

  const { handleGoogle, loading, error } = useFetch(
    //make a useFetch but for POST/ or edit this to be generic
    `${process.env.REACT_APP_APIURL}/auth/signup`, 'POST', undefined
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      console.log("-------------------REACT_APP_GOOGLE_CLIENT_ID----------------- ", process.env.REACT_APP_GOOGLE_CLIENT_ID);

      // .initialise script to handle functionallity in google form
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
      <nav style={{ padding: "2rem" }}>
        <Link to="/">Go Back</Link>
      </nav>
      <header style={{ textAlign: "center" }}>
        <h1>Register to continue</h1>
      </header>
      <Container maxWidth="sm">

      {/* {isSignup ? <Typography variant="h4">Signup Successful</Typography> : <Typography variant="h4">Signup failed</Typography>} */}
      <Box sx={{ mt: 8 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="fName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="pswd"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
          </Box>
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <a href="/login" variant="body2">
                Already have an account? Sign in
              </a>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div id="signUpDiv" data-text="signup_with"></div>
        )}
      </main>
      <footer></footer>
    </>
  );
};

export default SignUp;
