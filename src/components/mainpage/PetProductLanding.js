import * as React from "react";
import { useState, useEffect } from "react";

import SFooter from "../footer/footer";
import SHeader from "../header/header";
import SlideShow from "../mainBanner/slideShow";
import queryString from 'query-string';
// import { useParams, useLocation } from 'react-router-dom';

import PetProductGrid from "./petProductGrid";

export default function PetProductLanding() {

  const queryParams = queryString.parse(window.location.search);
  //console.log(queryParams.type); // "value1"
  const [productsData, setproductsData] = useState([]);
  const [defaultSorting, setdefaultSorting] = useState('');
  // const [petType, setpetType] = useState('');

  // console.log('Type in URL = ', queryParams.type);
  // setpetType(queryParams.type);

const petType = queryParams.type;
  useEffect(() =>{
    const fetchproducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_APIURL}/getProducts?pet=${petType}`);      

        const data = await response.json();
        let prodList = data.map((prod, index) => {

          //to remove uploads or public in image path beginning
          const url = `${prod.productImage.path}`.slice(7);
          
          const imgPath = `${process.env.REACT_APP_APIURL}/${url}`;
          // console.log(`image url for ${index}`, imgPath);
          let catWithImage = { ...data[index], imageUrl: imgPath };
          return catWithImage;
        });       

        setproductsData(prodList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchproducts();
  },[])
  return (
    <div>
       <SHeader></SHeader>
      <SlideShow></SlideShow>   
      <div className="container">
        <PetProductGrid data={productsData} sortBy = {defaultSorting}></PetProductGrid>
      </div>
      <SFooter></SFooter> 
    </div>
  );
}
