import "./App.css";
import React, { useEffect, createContext } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// paypal
import {PayPalScriptProvider,PayPalButton} from '@paypal/react-paypal-js';


import "./App.css";

import Login from "./components/loginsignup/login";
import SignUp from "./components/loginsignup/signUp";
import GetAll from "./components/getAll";
import GetServices from "./components/services/services";
import GetBlogs from "./components/blogs/blogs";
import CatLanding from "./components/Pets/CatLanding";
import PetProductLanding from "./components/mainpage/PetProductLanding";
import Homepage from "./components/homepage/homepage";
import ProductDetails from "./components/productDetails/productDetails";
import Error from "./components/PageNotFound/PageNotFound";
import ReportGenerator from "./components/AddToCart/addToCart";
import Cart from "./components/AddToCart/cart";
import CardDetailsForm from "./components/Checkout/payment";
import Feature from "./components/Feature/Feature";
import PayPal from "./components/Checkout/Paypal";
import GoToTopButton from './components/GoToTop/GoToTop';
export const AppContext = createContext();

function App() {
  const [user, setUser] = useState({});

  // const [apiUrl, setapiUrl] = useState(process.env.REACT_APP_APIURL);
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState(sessionStorage.getItem("cart"));

  const userObj = sessionStorage.getItem('userData');
  const isUserLogggedIn = userObj == null ? false : JSON.parse(userObj).isLoggedIn;
  
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        setCartData(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    const cart = JSON.parse(cartData) || [];
    setCartCount(cart.length);

    // return () => {
    //   window.removeEventListener("storage", handleStorageChange);
    // };
  }, [cartData]);



  //we’ll update the file to check for a user in the local storage
  useEffect(() => {
    const theUser = localStorage.getItem("user");
    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);

  return (
    // pass petfinder token to use this token specifically to call petfinder apis throughout application
    <AppContext.Provider value={{  cartCount, setCartCount }}>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path='/' //element={<Homepage></Homepage>} />
            // element={user?.email ? <Homepage /> : <Navigate to='/signup' />}
            element={<Homepage />}
          />
          <Route
            exact
            path='/signup'
           element = {<SignUp />}
            // element={<SignUp />}
          />
          <Route
            exact
            path='/home'
            element={<Homepage />}
            // element={<SignUp />}
          />
          <Route
            exact
            path='/login'
            element = {<Login />}
          />
          <Route
            exact
            path='/home'
            element={<Navigate to='/' />}
          />
          
          <Route
            exact
            path='/feature'
            element={<Feature/>}
          />
          <Route
            exact
            path='/GetAll'
            element={<GetAll />}
          />
          <Route
            exact
            path='/GetServices'
            element={<GetServices />}
          />
          <Route
            exact
            path='/GetBlogs'
            element={<GetBlogs />}
          />
          <Route
            
            path='/GetCategories/:petType'
            element={<CatLanding/>}
          />
          <Route
            exact
            path='/GetProducts'
            element={<PetProductLanding />}
          />
          <Route
            exact
            path='/ProductDetail'
            element={<ProductDetails />}
          />
          <Route
            path='/Cart/:buynow?'
           element={<Cart />}
          />
          <Route
            path='*'
            element={<Error />}
          />{" "}
          <Route
            path='/Invoice'
            element={isUserLogggedIn ? <ReportGenerator /> :<Navigate to="/NotFound" />}
          />
          {/* <Route
            path='/Payment'            
            element={isUserLogggedIn ? <CardDetailsForm /> :<Navigate to="/NotFound" />}
          /> */}
          {/* <PayPalScriptProvider> */}
          <Route
            path='/Paypal'            
            element={isUserLogggedIn ? <PayPal /> :<Navigate to="/NotFound" />}
          />
          {/* </PayPalScriptProvider> */}
        </Routes>
        <GoToTopButton/>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
