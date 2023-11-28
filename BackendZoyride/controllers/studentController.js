import studentModel from "../models/studentModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import { Payment } from "../models/paymentModel.js";

import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

export const createStudentController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });

      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const students = new studentModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      students.photo.data = fs.readFileSync(photo.path);
      students.photo.contentType = photo.type;
    }
    await students.save();
    res.status(201).send({
      success: true,
      message: "student Created Successfully",
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing student",
    });
  }
};

export const getPaymentController = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//get all students

export const getStudentController = async (req, res) => {
  try {
    const students = await studentModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: students.length,
      message: "ALlstudents ",
      students,
    });
    console.log(students);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting students",
      error: error.message,
    });
  }
};
// get single student
export const getSingleStudentController = async (req, res) => {
  try {
    const student = await studentModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single student Fetched",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single student",
      error,
    });
  }
};

// get photo
export const studentPhotoController = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.pid).select("photo");
    if (student.photo.data) {
      res.set("Content-type", student.photo.contentType);
      return res.status(200).send(student.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteStudentController = async (req, res) => {
  try {
    await studentModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "student Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting student",
      error,
    });
  }
};

//upate studenta
export const updateStudentController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const students = await studentModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      students.photo.data = fs.readFileSync(photo.path);
      students.photo.contentType = photo.type;
    }
    await students.save();
    res.status(201).send({
      success: true,
      message: "student Updated Successfully",
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte student",
    });
  }
};

// filters
export const studentFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const students = await studentModel.find(args);
    res.status(200).send({
      success: true,
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering students",
      error,
    });
  }
};

// student count
export const studentCountController = async (req, res) => {
  try {
    const total = await studentModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in student count",
      error,
      success: false,
    });
  }
};

// student list base on page
export const studentListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const students = await studentModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search student
export const searchStudentController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await studentModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search student API",
      error,
    });
  }
};

// similar students
export const realtedStudentController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const students = await studentModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related student",
      error,
    });
  }
};

// get prdocyst by catgory
export const studentCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const students = await studentModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting students",
    });
  }
};

//payment gateway api
//token
