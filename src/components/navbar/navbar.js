import React, { useState, useEffect } from "react";
// import { makeStyles, styled, alpha } from "@material-ui/core/styles";
// import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { makeStyles, styled, alpha } from "@material-ui/core/styles";
import SearchIcon from "@mui/icons-material/Search";
import { ExitToApp } from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRef } from "react";
import { useContext } from "react";
import { AppContext } from "../../App";
import { Link as RouterLink } from "react-router-dom";
import { Badge } from "@mui/material";
import LoginWidget from "../widgets/loginWidget";
// import { logout } from "../../utilityFn/logoutFn";
// import {browserHistory} from 'react-router'
import {saveCart} from '../../utilityFn/saveCart';
import "./navbar.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Link,
} from "@material-ui/core";
import { Menu } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: '75px',
    height: 'auto',
    padding: '6%'
  },
  appBar: {
    backgroundColor: "#b92925", //white
  },
  heading: {
    color: "black",
    fontWeight: "bold",
  },
  menuButton: {    
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: 240,
  },
  btn:{
    color:'#FFF !important',
    fontSize:'100%'
  }
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({}));

function Sheader() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [showLoginWidget, setshowLoginWidget] = useState(false);
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
  const { cartCount } = useContext(AppContext);
  const loginWidgetRef = useRef(null);

  useEffect(() => {
    const userLogged =
      sessionStorage.getItem("userData") !== null
        ? JSON.parse(sessionStorage.getItem("userData")).isLoggedIn
        : false;
    setisUserLoggedIn(userLogged);
  }, [isUserLoggedIn]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };


  const logout = async () => {
    if (sessionStorage.getItem("userData") != null) {
      console.log("logout clicked");
      await saveCart(sessionStorage.getItem("cart"))
        .then(() => {
          sessionStorage.removeItem("userData");
          setisUserLoggedIn(false);
          sessionStorage.removeItem("cart");
          alert("Logout successful");
        })
        .catch((err) => {
          console.log("Something went wrong.. ", err);
          alert("Something went wrong");
        });
      window.location.href="/";
    } else {
      alert("User not logged in");
    }
  };

  const handleClickOutside = (e) => {
    if (loginWidgetRef.current && !loginWidgetRef.current.contains(e.target)) {
      loginWidgetRef.current.style.display = "none";
      document.removeEventListener("mousedown", handleClickOutside);
      setshowLoginWidget(false);
    }
  };
  const menuItems = [
    { name: "Shop", ref: "/" },
    { name: "Products", ref: "/getProducts?type=all" },
    { name: "Adopt", ref: "/home/#adoptAPet" },
    { name: "Categories", ref: "/GetCategories/all" },
    { name: "Blogs", ref: "/getBlogs" },
    // { name: "Cart", ref: "/Cart" },
  ];
  const handleSearch = async (e) => {
    const searchTerm = searchInputRef.current.value;

    if (searchTerm.trim() !== "") {
      const res = await fetch(
        `${process.env.REACT_APP_APIURL}/search?term=${searchTerm}`
      );
      const data = await res.json();
      setSearchResults(data);
    } else {
      setSearchResults(["Nothing found...Try another term!"]);
    }
  };
  const handleSearchResultClick = (productId) => {
    setSearchResults([]);
    searchInputRef.current.value = "";
    navigate(`/productDetail?id=${productId}`);
  };

  //show login widget
  const openLoginWidget = () => {
    document.addEventListener("mousedown", handleClickOutside);
    setshowLoginWidget(true);
  };

  const goToCart= () => {

    const userData = {
      userEmail:
        sessionStorage.userData === undefined
          ? null
          : JSON.parse(sessionStorage.userData).username,
    };
    if (userData.userEmail != null) {
    window.location.href='/Cart';
    }else {
      let answer = window.confirm("You must login to view cart");
      if (answer) {
        // window.location.href = "/login";
        setshowLoginWidget(true);
      } 
      else
      {
        setshowLoginWidget(false);
        // console.log('NOOOO')
      }
  }
}
  return (
    <>
      <Box sx={{ flexGrow: 1, width: 1,borderBottom:'1px solid #FFF' }}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}              
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
            <a className="swagimalLogo" href="/">
              <img
                src={process.env.PUBLIC_URL + "/swagimalsLogo.svg"}
                alt="Logo"
                className={classes.logo}
              />
            </a>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                flex: 1,
              }}
            >
              <div className="searchBar">
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#000", pr: "7px", position:'relative' }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                  inputRef={searchInputRef}
                  onChange={handleSearch}
                />
                {searchResults.length > 0 && (
                  <div className="searchResults">
                    {searchResults.map((result) => (
                      <div
                        key={result._id}
                        className="searchResult"
                        onClick={() => handleSearchResultClick(result._id)}
                      >
                        {result.productName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {menuItems.map((item) => {
                  if (item.name === "Cart" && !isUserLoggedIn) {
                    return null; // skip "Cart" item if user is logged in
                  }
                  return (
                    <Link href={item.ref} key={item.name}>
                      <Button className={classes.btn}>{item.name}</Button>
                    </Link>
                  );
                })}
              </Box>
                 {/* <RouterLink to="/Cart"> */}
                 <IconButton onClick={goToCart}>
                   <Badge badgeContent={cartCount} color="error">                     
                     <ShoppingCartIcon sx={{color:'#FFF'}}></ShoppingCartIcon>
                   </Badge>
                 </IconButton>
               {/* </RouterLink> */}

               {isUserLoggedIn ? (
                <>                <IconButton onClick={logout}>
                  <ExitToApp sx={{color:'#FFF'}}></ExitToApp>
                </IconButton>
                </>
              ) : (
                <>
                <IconButton onClick={openLoginWidget}>
                  <AccountCircleIcon sx={{color:'#FFF'}}></AccountCircleIcon>
                </IconButton>
                </>
              )}
              {showLoginWidget ? (
                <div
                  id="loginWidget"
                  //inputRef={loginWidgetRef}
                  ref={loginWidgetRef}
                  className="loginWidgetContainer"
                >
                  <LoginWidget></LoginWidget>
                </div>
              ) : (
                <></>
              )}
            </div>

            <Drawer
              anchor="left"
              open={open}
              onClose={handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
            >
              <List>
                {menuItems.map((item) => (
                  <ListItem
                    button
                    component="a"
                    href={item.ref}
                    key={item.name}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Sheader;
