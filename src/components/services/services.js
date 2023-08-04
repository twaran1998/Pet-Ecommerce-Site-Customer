import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Paper, Typography } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    padding: 10,
    // margin: theme.spacing(3),
    height: "520px",
    // width: "480px",
  },
}));
///

function Services(){

  const [data, setData] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const config = {
      headers: {
        Authorization:
          "Bearer " +
          (localStorage.getItem("token") != null
            ? localStorage.getItem("token").replaceAll('"', "")
            : ""),
      },
    };
    const fetchData = async () => {
    
      try {
        const response = await fetch(`${process.env.REACT_APP_APIURL}/GetServices`);
        const data = await response.json();
        let serList = data.serviceData.map((ser, index) => {

          const url = `${ser.serviceImg.path}`.slice(7);
          const imgPath = `${process.env.REACT_APP_APIURL}/${url}`;
          let ServiceWithImage = { ...data.serviceData[index], imageUrl: imgPath };
          return ServiceWithImage;
        });
        setData(serList);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <>
      <div className="container-fluid bg-light pt-5">
        <div className="container py-5">
          <div className="d-flex flex-column text-center mb-5">
           
            <div className="display-6 m-0">
              <span className="text-primary">Premium</span> Pet Services
            </div>
          </div>

          <main
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
      <Grid
              container
              spacing={2}
              justify="center"
              sx={{ mt: "10", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}
            >
            {data.slice(0, 3).map((ser) => (
                    <Grid item xs={12} sm={6} md={4} key={ser._id}>
                      <Paper
                        variant="outlined"
                        square
                        elevation={0}
                        className={classes.card}
                      >
                        <CardContent style={{ textAlign: "justify" }}>
                          <CardMedia
                            component="img"
                            image={ser.imageUrl}
                            alt={ser.serviceName}
                            style={{
                              height: 250,
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                          <br></br>
                          <Typography
                            variant="h4"
                            sx={{}}
                            color="danger"
                            textAlign={"center"}
                          >
                            {ser.serviceName}
                          </Typography>
                          <br></br>
                          <Typography
                            variant="contained"
                            color="black"
                            align="justify"
                          >
                            {ser.description}
                          </Typography>
                        </CardContent>
                      </Paper>
                    </Grid>
                  ))
              }
            </Grid>
          </main>
        </div>
      </div>
    </>
  );
};

export default Services;
