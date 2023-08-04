import * as React from "react";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Avatar, Link } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    // maxWidth: 345,
    padding: 10,
    // margin: theme.spacing(2),    
  },
}));


function ShopByPets() {
  const [categories, setCategories] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_APIURL}/getPets`);
        // ,{
        //   headers:{
        //     Authorization: "Bearer " + (localStorage.getItem('token') != null ? localStorage.getItem('token').replaceAll('"', '') : '')
        //   }
        // });
        const data = await response.json();
        let petList = data.map((cat, index) => {

          //to remove uploads or public in image path beginning
          const url = `${cat.petImage.path}`.slice(7);
          
          const imgPath = `${process.env.REACT_APP_APIURL}/${url}`;
          // console.log(`image url for ${index}`, imgPath);
          let petWithImage = { ...data[index], imageUrl: imgPath };
          return petWithImage;
        });

        setCategories(petList);

      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategories();
  }, []);

  return (
    <div style={{ padding:'1%', backgroundColor:'#FFF', margin:'0 5vw 0vw 5vw'}}>
      {/* <Typography
        variant="h5"
        sx={{
        }}
      >
       Shop by pet :
      </Typography> */}
      <div className="d-flex flex-column text-center mb-5">
            {/* <h4 className="text-secondary mb-3">Our Services</h4> */}
            <div className="display-6 mt-3">
              Shop By Pet
            </div>
          </div>
      <Grid
        container
        spacing={2}
        justify="center"
        sx={{ mt: "" }}
      >
        {categories.slice(0,4).map((cat) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={cat._id}>
            <Card className={classes.card} sx={{boxShadow:'none'}}>
            <Link href={`/GetCategories/${cat.petType}`}>
              <CardMedia
                component="img"
                height="150vh"
                sx={{ objectFit: "cover", width:'75%','marginLeft': 'auto','marginRight': 'auto'}}
                image={cat.imageUrl}
                alt={cat.petType}
              /> 
             <CardContent style={{ color:'#000','textAlign': "center" }}> 
               <Typography >{(cat.petType).toUpperCase()}</Typography>
              </CardContent> 
              </Link>
          </Card>
             
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ShopByPets;
