import React from "react";
import "./mstyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Newsletter from "../newsletter/newsletter";
import { height } from "@mui/system";

function MoreAboutUs() {
  return (
    <div className="container-fluid mt-3 mb-3">
      <div className="row">
        <div className="col-lg-6 sm-12 p-5 moreAboutUs">
          <h1>More About Us</h1>
          <p>
          Everything Your pet needs in one place.From cats and dogs to birds, fish, and other small animals, we specialize in a wide selection of natural and holistic pet food, treats and supplements, in addition to toys and other essential products that pet parents need.
          </p>
          <img
            src="https://p1.pxfuel.com/preview/812/230/531/friendship-animal-human-sunrise-handshake-pet.jpg"
            alt="pet"
          />
        </div>
        <div className="col p-10 text-white redBg" >          
          <Newsletter></Newsletter>       
        </div>
      </div>
    </div>
  );
}

export default MoreAboutUs;
