import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function SimplePaper() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_APIURL}/getCategories`)
      .then((res) => res.json())
      .then((jsonRes) => setCategories(jsonRes));
  }, []); 

  return (
    <div>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.categoryName}>
            <Item>
              <Card sx={{ maxWidth: 350, borderRadius: "50%" }}>
                <Box>
                  <CardMedia
                    component="img"
                    alt={category.categoryName}
                    height="140"
                    image={category.categoryImage}
                  />
                </Box>
              </Card>
              <hr> </hr>
              <Box sx={{ paddingTop: 2 }}>
                <Typography variant="h5">{category.categoryName}</Typography>
              </Box>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: 10 }}>
        <Item>
          <Typography variant="h5">
            <strong>ABOUT</strong>
          </Typography>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Item>
      </Grid>
    </div>
  );
}
