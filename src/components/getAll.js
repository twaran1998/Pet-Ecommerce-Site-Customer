
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from 'axios';

const config = require('../utilityFn/GenerateToken');

// https://developers.google.com/identity/gsi/web/reference/js-reference

const GetAll = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])


    useEffect(() => {
      const config = {
        headers: {
           Authorization: "Bearer " + (localStorage.getItem('token') != null ? localStorage.getItem('token').replaceAll('"', '') : '')
        }
  
     }
        const fetchData = async () =>{
          setLoading(true);
          try {
            const {data: response} = await axios.get(`${process.env.REACT_APP_APIURL}/GetAll`, config);
            setData(response);
          } catch (error) {
            setData(error.message);
                  
          }
          setLoading(false);
        }
    
        fetchData();
      }, [data]);

  return (
    <>
    
      {loading && <div>Loading</div>}
    {!loading && (
      <div>
        {/* {data.map(item => (<span>{item.name}</span>))} */}
        <h2>Response : {data} </h2>
      </div>
    )}
    
    </>
  );
};

export default GetAll;