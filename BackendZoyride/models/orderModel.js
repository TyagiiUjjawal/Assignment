import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "undone",
      enum: ["undone", "Ongoing", "done"],
    },
    distanceStart: {
      type: Number,
      default: 0,
    },
    distanceEnd: {
      type: Number,
      default: 0,
    },
    pickupTime: {
      type: Date, // Timestamp for when the rider takes the bike
    },
    returnTime: {
      type: Date, // Timestamp for when the rider returns the bike
    },
    slotTime: {
      type: Number,
      default: 10, // Default slot time in minutes
      min: 5, // Minimum slot time
      max: 30, // Maximum slot time
    },
    membership: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
