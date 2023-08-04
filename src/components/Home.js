
//On successful login

import React from "react";
import GetAll from '../components/getAll';
import { Link } from "react-router-dom";

import Services from '../components/services/services';
import Blogs from '../components/blogs/blogs';

const Home = ({ user }) => {
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  
  return (
    <div style={{ textAlign: "center", margin: "3rem" }}>
        <header>Swagimals Header</header>
      <h2>Dear {user?.email}</h2>

      <p>
        You are viewing this page because you are logged in or you just signed
        up
      </p>
      <hr></hr>
      {/* <GetAll></GetAll> */}
      <Services></Services>
         <hr></hr>
      <Blogs></Blogs>
      <hr></hr>
      <div>
        <button
          onClick={logout}
          style={{
            color: "red",
            border: "1px solid gray",
            backgroundColor: "white",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
      <footer>Swagimals Footer</footer>
    </div>
  );
};

export default Home;