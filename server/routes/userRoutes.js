import express from "express";
import { Signup } from "../controllers/Signup.js";
import { Signin } from "../controllers/Signin.js";
import { Forgot } from "../controllers/Forgot.js";
import { Newpassword } from "../controllers/Newpassword.js";
import { ForgotData } from "../controllers/ForgotData.js";
import { ForgotPhone } from "../controllers/ForgotPhone.js";
import { ForgotDataPhone } from "../controllers/ForgotDataPhone.js";
const router=express.Router();

router.post("/signup",Signup);
router.post("/signin",Signin);
router.put("/forgot",Forgot);
router.post("/forgotData",ForgotData);
router.put("/newpassword",Newpassword);
router.put("/forgotphone",ForgotPhone);
router.post("/forgotDataPhone",ForgotDataPhone);

export default router;
