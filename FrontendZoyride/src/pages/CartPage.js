import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import { v4 as uuidv4 } from "uuid";

const CartPage = () => {
  const taskId = uuidv4(); // Generate a unique task ID
  const groupId = uuidv4(); // Generate a unique group ID
  const [base64Image, setBase64Image] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [auth, setAuth] = useAuth();
  const [ava, setAva] = useState(false);
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [slotTime, setSlotTime] = useState(5); // Default slot time
  const [slotTimeOk, setSlotTimeOk] = useState(false); // Use state to manage slotTimeOk
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setBase64Image(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSlotTimeChange = (event) => {
    const selectedSlotTime = event.target.value; // Get the selected slot time

    // Update slotTime state and use the updated value
    setSlotTime(selectedSlotTime);
    setSlotTimeOk(true); // Update slotTimeOk using the state setter

    // Use the selected slot time immediately for any further operations
    console.log("Selected Slot Time:", selectedSlotTime);
    toast.success(selectedSlotTime);
  };

  const navigate = useNavigate();

  //total price

  const checkoutHandler = async (amount) => {
    const userN = auth?.user?.name;
    const prId = cart.map((item) => item._id);

    try {
      const {
        data: { key },
      } = await axios.get("/api/getkey");

      if (!auth?.token && slotTimeOk) {
        alert("Please log in to proceed with the payment.");
        navigate("/login", { state: "/cart" });
        return;
      }
      const {
        data: { order },
      } = await axios.post("/api/v1/payment/checkout", {
        amount,
      });
      // .then((res, e) => {
      //   console.log("====================================");
      //   console.log(res, e);
      //   console.log("====================================");
      // })
      // .catch((e) => {
      //   console.log("====================================");
      //   console.log(e);
      //   console.log("====================================");
      // });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "BIKE RENTAL",
        description: "BIKEEE",
        image:
          "https://5.imimg.com/data5/SELLER/Default/2022/5/XZ/HI/WI/68853065/honda-unicorn-bike.png",
        order_id: order.id,
        callback_url:
          "http://localhost:8080/api/v1/payment/paymentverification",
        // prefill: {
        //   name: "",
        //   email: "gaurav.kumar@example.com",
        //   contact: "9999999999",
        // },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
        handler: async (response) => {
          // The response contains the razorpay_order_id, razorpay_payment_id, and razorpay_signature
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          // Now you need to send these details back to your server for verification
          // using another API endpoint on your server

          try {
            const pp = cart.price;
            console.log("====================================");
            console.log("cart", pp);
            console.log("====================================");
            console.log("hell", slotTime);
            const response = await axios.post(
              "/api/v1/payment/paymentverification",
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                cart,
                slotTime,
                userN,
                pp,
                prId,
                ava,
              }
            );

            if (response.data.success) {
              // Payment successful, handle success case here
              // For example, navigate to a success page or show a success message
              console.log("Payment successful");
              navigate(`/paymentsuccess?reference=${razorpay_payment_id}`); // Redirect to a success page
            } else {
              // Payment failed, handle failure case here
              // For example, show an error message to the user
              console.log("Payment failed");
            }
          } catch (error) {
            // Handle error from the server, if any
            console.log("Error during payment verification:", error);
          }
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log("Error during checkout:", error);
    }
  };
  // const prId = [];

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
        // prId.push(item.id);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              {cart?.map((p) => (
                <div
                  style={{ backgroundColor: "gray" }}
                  className="row card flex-row"
                  key={p._id}
                >
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/student/student-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                  </div>
                  <div className="">
                    {/* <button onClick={handleSlotTime(slotTime)}>Submit</button> */}
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                  <br />
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Pickup Address:-</h4>
                    {/* <h5>{auth?.user?.address}</h5> */}
                    <h5>Main Parking Area of Nit Kurukshetra</h5>
                    {/* <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button> */}
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    {
                      /* <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button> */
                    }
                  ) : (
                    <button
                      style={{ backgroundColor: "orange", color: "black" }}
                      className="btn  btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              )}
              <div className="">
                <label htmlFor="slotTime">
                  <span
                    style={{ backgroundColor: "Highlight", color: "white" }}
                  >
                    Expected Time:
                  </span>{" "}
                  within:
                </label>
                <select
                  id="slotTime"
                  name="slotTime"
                  value={slotTime}
                  type="Number"
                  onChange={handleSlotTimeChange}
                >
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="30">30 minutes</option>
                </select>
              </div>
              <div>
                <h1>Upload Image</h1>
                {/* <button onClick={() => checkdl()}>CHECK</button> */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {base64Image && (
                  <div>
                    <h2>Image Preview</h2>
                    <img src={base64Image} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="mt-2">
                <button
                  className="btn btn-primary"
                  onClick={() => checkoutHandler(cart[0].price)} // Wrap the checkoutHandler call in an arrow function
                  // disabled={loading || !instance || !auth?.user?.address}
                >
                  Make Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
