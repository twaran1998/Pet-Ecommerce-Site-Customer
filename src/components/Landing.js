

// The landing page in our case is the only page available for an unauthenticated user

import { useState, useEffect } from 'react';
import React from "react";
import { Link } from "react-router-dom";

import GetServices from '../components/services/services'

const Landing = () => {
  

    return (
      <>
        <header style={{ textAlign: "center" }}>
          <h1>Welcome to Swagimals</h1>
        </header>
        <main style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              border: "1px solid gray",
              padding: "0.5rem 1rem",
              backgroundColor: "wheat",
              color: "#333",
            }}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              border: "1px solid gray",
              padding: "0.5rem 1rem",
              backgroundColor: "whitesmoke",
              color: "#333",
            }}
          >
            Login
          </Link>
          <Link
            to="/getAll"
            style={{
              textDecoration: "none",
              border: "1px solid gray",
              padding: "0.5rem 1rem",
              backgroundColor: "whitesmoke",
              color: "#333",
            }}
          >
            Get all users (test)
          </Link>
          <Link
            to="/GetServices"
            style={{
              textDecoration: "none",
              border: "1px solid gray",
              padding: "0.5rem 1rem",
              backgroundColor: "whitesmoke",
              color: "#333",
            }}
          >
            Get Services (test)
          </Link>
          <Link
            to="/GetBlogs"
            style={{
              textDecoration: "none",
              border: "1px solid gray",
              padding: "0.5rem 1rem",
              backgroundColor: "whitesmoke",
              color: "#333",
            }}
          >
            Get Blogs (test)
          </Link>
          <Link
            to="/SearchPets"
            style={{
              textDecoration: "none",
              border: "1px solid gray",
              padding: "0.5rem 1rem",
              backgroundColor: "whitesmoke",
              color: "#333",
            }}
          >
            Get Pet landing (test)
          </Link>
          <Link
            to="/GetProducts"
            style={{
              textDecoration: "none",
              border: "1px solid gray",
              padding: "0.5rem 1rem",
              backgroundColor: "whitesmoke",
              color: "#333",
            }}
          >
            Get Pet landing (twaran)
          </Link>
          <Link
            to="/GetCat"
            style={{
              textDecoration: "none",
              border: "1px solid gray",
              padding: "0.5rem 1rem",
              backgroundColor: "whitesmoke",
              color: "#333",
            }}
          >
            Get Categories
          </Link>
          
        </main>
      </>
    );
  };
  export default Landing;