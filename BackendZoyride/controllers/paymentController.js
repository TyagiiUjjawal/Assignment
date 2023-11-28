// import { instance } from "../server";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import Razorpay from "razorpay";
import { log } from "console";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

// dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    console.log("====================================");
    console.log(options);
    console.log("====================================");
    const order = await instance.orders.create(options);
    console.log("after odered");
    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log("checkout error", err);
  }
};

export const paymentVerification = async (req, res) => {
  console.log("payvaavduavdu", req.body);
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    cart,
    slotTime,
    userN,
    pp,
    prId,
    ava,
    idd,
  } = req.body;

  console.log(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userN
  );

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    let total = 0;
    cart?.map((item) => {
      total = total + item.price;
    });
    // Database comes here
    console.log("====================================");
    console.log(total, typeof total, prId, ava, idd);
    console.log("====================================");

    try {
      for (let i = 0; i < prId.length; i++) {
        const productId = prId[i];
        // const availability = ava[i];

        // Find the product by ID and update availability
        await productModel.findByIdAndUpdate(productId, { available: ava });
      }
      await orderModel.findByIdAndUpdate(idd, { status: "done" });
    } catch (e) {
      console.log("====================================");
      console.log("error in product change", e);
      console.log("====================================");
    }
    // Update product availability

    await Payment.create({
      name: userN,
      price: total,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    if (ava == false) {
      const order = new orderModel({
        products: cart,
        payment: req.body,
        buyer: req.user._id,
        slotTime: slotTime,
      }).save();
    }

    // res.redirect(
    //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    // );
    res.json({
      success: true,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
