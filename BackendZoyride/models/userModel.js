import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    drivingLicenseNumber: {
      type: String, // You can use Number if it's numeric
      // required: true,
    },
    idCardImage: {
      data: Buffer, // Store binary image data
      contentType: String, // Store image MIME type
    },

    address: {
      type: {},
      // required: true,
    },
    answer: {
      type: String,
      // required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
