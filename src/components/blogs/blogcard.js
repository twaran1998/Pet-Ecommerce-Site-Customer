import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@material-ui/core";

function BlogCards() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_APIURL}/api/GetBlog`)
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.log(error));
  }, []);
////
  return (
 
    <Grid container spacing={2}>
      {blogs.map((blog) => (
        <Grid item xs={12} sm={6} key={blog._id}>
          <Card>
            <CardMedia
              component="img"
              alt="Blog Image"
              height="200"
              image={blog.Image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {blog.Title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {blog.Content}
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                {new Date(blog.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

  );
}

export default BlogCards;