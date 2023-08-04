// import React, { useState, useEffect } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
// } from "@material-ui/core";
// import SHeader from '../navbar/navbar'
// import SFooter from '../footer/footer'

// function BlogCards() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_APIURL}/GetBlog`)
//       .then((response) => response.json())
//       .then((data) => {
//         let blogList = data.map((cat, index) => {

//           //to remove uploads or public in image path beginning
//           const url = `${cat.blogImage.path}`.slice(7);
          
//           const imgPath = ``${process.env.REACT_APP_APIURL}/${url}`;
//           // console.log(`image url for ${index}`, imgPath);
//           let petWithImage = { ...data[index], imageUrl: imgPath };
//           return petWithImage;
//         });

//         setBlogs(blogList)
//       })
//       .catch((error) => console.log(error));
//   }, []);
// ////
//   return (
//     <div>
//       <SHeader></SHeader>
//       <br></br>
//       <div className="d-flex flex-column text-center mb-5">
//             {/* <h4 className="text-secondary mb-3">Our Services</h4> */}
//             <div className="display-6 m-0">
//              Swagimals Blog's
//             </div>
//           </div>
//     <Grid container spacing={2}>
//       {blogs.map((blog) => (
//         <Grid item xs={12} sm={6} key={blog._id}>
//           <Card>
            
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="h2">
//                 {blog.Title}
//               </Typography>
//               <CardMedia
//               component="img"
//               alt="Blog Image"
//               height="200"
//               image={blog.imageUrl}
//             />
//               <Typography variant="body2" color="textSecondary" component="p">
//                 {blog.Content}
//               </Typography>
              
//               <Button variant="contained" color="secondary">
//                 {" "}
//                 read more{" "}
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//     <SFooter></SFooter>
//     </div>
//   );
// }

// export default BlogCards;


import React, { useState, useEffect } from "react";
import SHeader from '../navbar/navbar'
import SFooter from '../footer/footer'

function BlogCards() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_APIURL}/GetBlog`)
      .then((response) => response.json())
      .then((data) => {
        let blogList = data.map((cat, index) => {

          //to remove uploads or public in image path beginning
          const url = `${cat.blogImage.path}`.slice(7);
          
          const imgPath = `${process.env.REACT_APP_APIURL}/${url}`;
          // console.log(`image url for ${index}`, imgPath);
          let petWithImage = { ...data[index], imageUrl: imgPath };
          return petWithImage;
        });

        setBlogs(blogList)
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <SHeader />
      <div className="container pt-5">
        <div className="d-flex flex-column text-center mb-5 pt-5">
         
          <h1 className="display-4 m-0"><span className="text-primary">Updates</span> From Blog</h1>
        </div>
        <div className="row pb-3">
          {blogs.map((blog) => (
            <div className="col-lg-4 mb-4" key={blog._id}>
              <div className="card border-0 mb-2">
                <img className="card-img-top" src={blog.imageUrl} alt="Blog Image" />
                <div className="card-body bg-light p-4">
                  <h4 className="card-title text-truncate">{blog.Title}</h4>
                  <div className="d-flex mb-3">
                    <small className="mr-2"><i className="fa fa-user text-muted"></i> Admin</small>
                    
                    
                  </div>
                  <p style={{textAlign:'justify'}}>{blog.Content}</p>
                  <a className="font-weight-bold" href="#">Read More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SFooter />
    </div>
  );
}

export default BlogCards;
