
import React, { useRef, useEffect, useState } from "react";
import "./paypal.css";
// import CreateInvoice from "./invoice";
export default function Paypal(props) {
  const paypal = useRef();
  const [userCart, setuserCart] = useState(
    JSON.stringify(sessionStorage.getItem("cart"))
  );
  const [buyNowCart, setBuyNowCart] = useState(
    JSON.parse(sessionStorage.getItem("buyNowCart"))
  );

  const [subTotal, setsubTotal] = useState(parseFloat(props.subTotal));
  useEffect(() => {
    // generateOrder(userCart);
    // Check if there is already a PayPal button
    if (!paypal.current.children.length) {
      //To create PayPal button , standard implementation
      window.paypal
        .Buttons({
          createOrder: function (data, actions) {
            //For buy now functionality, always 1 item
            if (props.buynow) {
              console.log('buyNowCart', buyNowCart);
             
              const usersOrder = [
                {
                  reference_id: `JAS00${new Date()}`,
                  description: buyNowCart.productName,
                  amount: {
                    currency_code: "CAD",
                    value : 0.01, //subTotal
                  },
                  Quantity: buyNowCart.Quantity == null || buyNowCart.Quantity == undefined ? 1 : buyNowCart.Quantity,
                },
              ];
              console.log("buy now order = ", usersOrder);
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: usersOrder,
              });
            } else {
              // console.log("userCart/order = ", userCart);
              // console.log("type of userCart= ", typeof userCart);

              let userSessionCart = JSON.parse(userCart);
              // console.log("userSessionCart = ", userSessionCart);
              // console.log("type of userSessionCart = ", typeof userSessionCart);

              const order = JSON.parse(userSessionCart);
              // console.log("parsing once more ", order);
              // console.log('type of parsing once more ', typeof test);
               
              // const totalPrice = 0;
              // const totalPrice = order.reduce(
              //   (accumulator, item) => accumulator + (parseFloat(item.productPrice) * (),
              //   0
              // );
              //const total = (parseFloat(buyNowCart.productPrice) + (parseFloat(buyNowCart.productPrice) * 0.13)).toFixed(2)
              const getTotalVlue=(item) => {
                const itemTotal = parseFloat(item.productPrice)*parseFloat(item.Quantity);
                const cgst = 0.13;
                const sub = itemTotal + (itemTotal * cgst);
                return sub.toFixed(2);
                //  parseFloat(parseFloat(item.productPrice)*(parseFloat(item.Quantity)) + ((parseFloat(item.productPrice) * 0.13))).toFixed(2)
              }
              const usersOrder = order.map((item, index) => {
                return {
                  reference_id: `JAS00${index}`,
                  description: item.productName,
                  amount: {
                    currency_code: "CAD",
                    value: 0.01, //getTotalVlue(item)
                   
                  },
                  Quantity: item.Quantity,
                };
              });

              console.log("UsersORder = ", usersOrder);

              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: usersOrder,
              });
            }
          },
          //{generateOrder(userCarts,{actions})},
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log("ORDER = ", order);
            alert("Payment Successul");
            window.location.href = "/invoice";
          },
          onError: (err) => {
            console.log("Error = ", err);
            alert("Payment Failed");
          },
        })
        .render(paypal.current); //This means render this button in the ref button in function return
    }
  }, []);
  return (
    <div className="PayPalContainer">
      <div ref={paypal}></div>
      {/* <CreateInvoice></CreateInvoice> */}
    </div>
  );
}
