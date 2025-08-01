import Razorpay from "razorpay";
import connection from "../config/connection.js";
import crypto from "crypto";
const sequelize = connection;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function paymentVerification({
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
  userId,
}) {
  try {
    console.log("inside verification",  razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        userId);

        const body_data = razorpay_order_id + "|" + razorpay_payment_id;

        const expect = crypto
          .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
          .update(body_data)
          .digest("hex");
          console.log("expect ",expect)
          console.log("razorpay_signature ",razorpay_signature)
      
        const isValid = expect === razorpay_signature;
        return isValid
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error; // Rethrow the error for the caller to handle
  }
}

export async function itemsCheckout({
  currency = "INR",
  name,
  amount,
  userId,
}) {
  try {
    // Create an entry for razorpay
    console.log("itemsCheckout", name, amount, userId);
    const order = await razorpay.orders.create({
      amount: Number(amount * 100),
      currency,
    });

    // await orderModel.create({
    //   order_id: order.id,
    //   name: name,
    //   amount: amount,
    // });

    console.log("order", order);
    return order;
  } catch (error) {
    console.log(error);
    return null;
  }
}
