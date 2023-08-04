import * as React from "react";
import SFooter from "../footer/footer";
import Header from "../header/header";
// import PetAdoptionForm from "./petAdoptionForm";
import Newsletter from "../newsletter/newsletter";
import Banner from "./banner";
import ShopByCategory from "./shopByCategory";
import ShopByPets from "./shopByPets";
import Services from "../services/services";
import PetAdoptionForm from "../Pets/petAdoptionForm";
import MoreAboutUs from "../moreAboutUs/moreAboutUs";
function Homepage() {
  return (
    <div>
      {/* Display heaer */}
      <Header></Header>

      {/* Display banner */}
      <Banner></Banner>

      {/* Display Shop by category */}
      <ShopByCategory></ShopByCategory>
      <ShopByPets></ShopByPets>
      <div id="adoptAPet">
      <PetAdoptionForm ></PetAdoptionForm>
      </div>
      <Services></Services>
      {/* Display newsletter */}
      {/* <Newsletter></Newsletter> */}
      <MoreAboutUs></MoreAboutUs>
      {/* <div className="container"> */}
      {/* <PetGrid></PetGrid> */}
      {/* <PetAdoptionForm></PetAdoptionForm> */}
      <SFooter></SFooter>
      {/* </div> */}
    </div>
  );
}

export default Homepage;
