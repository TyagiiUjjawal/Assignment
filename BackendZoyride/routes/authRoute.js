import express from "express";
import {
  registerController,
  loginController,
  testController,
  updateProfileController,
  getusers,
  // phoneVerify,
} from "../controllers/authController.js";
import multer from "multer";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//REGISTER || METHOD POST
router.post("/register", upload.single("idCardImage"), registerController);

//LOGIN || POST
router.post("/login", loginController);

router.get("/getUsers", getusers);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;
