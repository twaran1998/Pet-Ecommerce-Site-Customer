import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatsAppIcon from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";
import Newletter from "../newsletter/newsletter";
import './footer.css';

// export default function SimpleBottomNavigation() {
//   const [value, setValue] = React.useState(0);
const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-dark text-white py-3 px-lg-3 px-md-18">
        <div className="row pt-4 ">
          <div className="col-lg-4 col-md-12 mb-5">
            <h1 className="mb-3 display-5 text-capitalize text-white">
              <span style={{color:'#D48F36'}}>Swagimals</span>
              {/* <a className = 'swagimalLogo' href="/" ><img src={process.env.PUBLIC_URL +'/swagimalsLogo.svg'}  alt="Logo" className='logo' /></a> */}
            </h1>
            <p className="m-0">
            At Swagimals, we strive to deliver the best products with the best service – and we want to become even better. Happy customers are always our #1 priority, and our team members are passionate about finding new ways to wow both pet owners and the industry at large
            </p>
          </div>
          <div className="col-lg-1 col-md-1"></div>
          <div className="col-lg-7 col-md-12">
            <div className="row">
              <div className="col-lg-6 col-md-6 mb-6 col-xs-0">
                <h5 className="mb-4" style={{color:'#D48F36'}}>Get In Touch</h5>
                <p>
                  <i className="fa fa-map-marker-alt mr-2"></i>Waterloo, Ontario
                </p>
                <p>
                  <i className="fa fa-phone-alt mr-2"></i>+1 905 783 9783
                </p>
                <p>
                  <i className="fa fa-envelope mr-2"></i>
                  swagimals.test@gmail.com
                </p>
              </div>
              <div className="col-lg-6 col-md-6 mb-6 col-xs-0">
                {/* <h5 className=" mb-4" style={{color:'#D48F36'}}>Popular Links</h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-white mb-2" href="/">
                    <i className="fa fa-angle-right mr-2"></i>Home
                  </a>
                  <a className="text-white mb-2" href="/">
                    <i className="fa fa-angle-right mr-2"></i>About Us
                  </a>
                  <a className="text-white mb-2" href="/">
                    <i className="fa fa-angle-right mr-2"></i>Our Services
                  </a>
                  <a className="text-white mb-2" href="/">
                    <i className="fa fa-angle-right mr-2"></i>Our Team
                  </a>
                  <a className="text-white" href="/">
                    <i className="fa fa-angle-right mr-2"></i>Contact Us
                  </a>
                </div> */}
                {/* <h1>Find us on map</h1> */}
                <h5 className="mb-4" style={{color:'#D48F36'}}>Swagimals Headquarters</h5>
        
          <iframe
        title='Waterloo, Ontario Map'
        className='mapContainer'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28937.074216007516!2d-80.5596365!3d43.46425700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf7de8cf12133%3A0xdb559ff947b6f8da!2sWaterloo%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sca!4v1650004894518!5m2!1sen!2sca'
        allowFullScreen=''
        width = '100%'
        loading='lazy'
      />    
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid text-white py-2 px-sm-3 px-md-5">
          <div className="row">
            <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
              <p className="m-0 text-white">
                &copy; Swagimals All Rights Reserved. Designed by Group 3
                Section1
              </p>
            </div>
            <div className="col-md-6 text-center text-md-right">
              <ul className="nav d-inline-flex">
                <li className="nav-item">
                  <a className="nav-link text-white py-0" href="/">
                    Privacy
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white py-0" href="/">
                    Terms
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white py-0" href="/">
                    FAQs
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white py-0" href="/">
                    Help
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
