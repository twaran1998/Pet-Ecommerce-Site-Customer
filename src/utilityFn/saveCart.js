export async function saveCart(cart) {
  // console.log("cart = ", cart);  
  if (cart != null && cart.length >0 ) {
    // console.log('UserDataIncart ', userCart);
    const userCart = JSON.parse(cart);

    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userEmail =
      userData != null && userData != undefined ? userData.username : null;
    //cart with only productId
    const myCart = userCart.map((item) => {
      // return {
      //   pId: item.productId,
      //   pQty: item.Quantity,
      // };

      let expectedFormat = {
        [item.productId]: {
          Quantity: item.Quantity,
        },
      };
      console.log("expectedFormat = ", expectedFormat);
      return expectedFormat;
    });

console.log('-=------------ UER CART ======-------', myCart)
    const userCartObj = {
      username: userEmail,
      userProducts: myCart,
    };
    console.log("userCartObj = ", userCartObj);
    console.log(
      "stringed = ",
      JSON.stringify({
        userCart: userCartObj,
      })
    );

    try {
      let res = await fetch(`${process.env.REACT_APP_APIURL}/saveCart`, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }), //else will give request {} in server
        body: JSON.stringify({
          userCart: userCartObj,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("Cart added to DB");
        window.location.href = "/";
      } else {
        console.log("Cart not added to DB");
      }
    } catch (err) {
      console.log("Failed to add cart to DB ", err);
    }
  }
  else
  {
    console.log('Failed to save cart ');
  }
  
}
