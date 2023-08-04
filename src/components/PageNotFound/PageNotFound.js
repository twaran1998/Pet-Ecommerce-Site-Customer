import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./PageNotFound.css";
import pgNotFound from "./404.gif";
export default class error extends Component {

  render() {
    return (
      <>
        <nav style={{ padding: "2rem", cursor: "pointer" }}>
          <a href="/">Go Back</a>
        </nav>
        <div className="Img_404" id="myblogContainer">
          <img srcSet={pgNotFound} alt="Page not found" />
        </div>
      </>
    );
  }
}
