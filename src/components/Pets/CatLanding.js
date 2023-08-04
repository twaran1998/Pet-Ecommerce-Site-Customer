import * as React from "react";
import { useParams } from "react-router-dom";
import SFooter from "../footer/footer";
import Header from "../header/header";
import SlideShow from "../mainBanner/slideShow";
import PetCatGrid from "./CatGrid";
import PetAdoptionForm from "./petAdoptionForm";
import Newsletter from "../newsletter/newsletter";

function CatLanding() {
 
const {petType} = useParams();
  // console.log('opet====== ', petType);
  return (
    <div>
      <Header></Header>
      <div className="container">
        <PetCatGrid petType = {petType}></PetCatGrid>
      </div>
      {/* <whyChooseUs></whyChooseUs> */}
      <SFooter></SFooter>
    </div>
  );
}

export default CatLanding;
