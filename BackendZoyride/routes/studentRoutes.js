import express from "express";
import {
  createStudentController,
  deleteStudentController,
  getStudentController,
  getSingleStudentController,
  studentCategoryController,
  studentCountController,
  studentFiltersController,
  studentListController,
  studentPhotoController,
  realtedStudentController,
  searchStudentController,
  updateStudentController,
  getPaymentController,
} from "../controllers/studentController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-student",
  requireSignIn,
  isAdmin,
  formidable(),
  createStudentController
);
//routes
router.put(
  "/update-student/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateStudentController
);

//get students
router.get("/get-student", getStudentController);
router.get("/get-payments", getPaymentController);

//single student
router.get("/get-student/:slug", getSingleStudentController);

//get photo
router.get("/student-photo/:pid", studentPhotoController);

//delete rstudent
router.delete("/delete-student/:pid", deleteStudentController);

//filter student
router.post("/student-filters", studentFiltersController);

//student count
router.get("/student-count", studentCountController);

//student per page
router.get("/student-list/:page", studentListController);

//search student
router.get("/search/:keyword", searchStudentController);

//similar student
router.get("/related-student/:pid/:cid", realtedStudentController);

//category wise student
router.get("/student-category/:slug", studentCategoryController);

export default router;
