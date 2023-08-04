import { useState } from "react";

const jwtUtils = require('../utilityFn/GenerateToken');


// async function addUser(userData) {


//   // Generate a random password and store it in your database

//   const randomPswd = "$wag!M@l$";

//   const data = {
//     userName: userData.firstName,
//     email: userData.email,
//     firstName: userData.firstName,
//     lastName: userData.lastName,
//     userPswd: randomPswd,
//     userRole: 2,
//     isUserActive: true,
//     // userRole: 0,
//     // isUserActive: 1
//   };

//   try {
//     let res = await fetch(`${process.env.REACT_APP_APIURL}/api/addUser`, {
//       method: "POST",
//       headers: new Headers({ "content-type": "application/json" }), //else will give reuest {} in server
//       body: JSON.stringify({
//         userData: data,
//       }),
//     });
//     let resJson = await res.json();
//     if (res.status === 200 && resJson.status)  {
//       console.log("User added");        
//       const loggedInUser = {
//         isLoggedIn : true,
//         username : (localStorage.getItem('user'.firstName) == null ? userData.firstName : null),
//         email : (localStorage.getItem('user'.email) == null ? userData.email : null)
//       };
//       const userObj = JSON.stringify(loggedInUser);
//       sessionStorage.setItem('userData',userObj);
//       alert('user added')
//       // setisSignup(true);
//       window.location.href = "/login";
      
//     } else {
//       const msg = `${resJson.message}`
//       console.log("User not added ",msg);
//       alert(msg);
//       // setisSignup(false);
//     }
//   } catch (err) {
//     console.log("Failed to add user ", err);
//     // setisSignup(false);
//   }
// }

// //For POST only
const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleGoogle = async (response) => {    
    console.log('response', response);
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {  
        "Content-Type": "application/json",
         "Bearer" : localStorage.getItem("token")
      },

     body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((data) => {
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          localStorage.setItem("token", JSON.stringify(data?.user.token));
          // addUser(data.user);
          // window.location.reload();
          window.location.href = "/";
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  
  return { loading, error, handleGoogle };
};

export default useFetch;