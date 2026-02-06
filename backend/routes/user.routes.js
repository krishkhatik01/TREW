import express from "express";
import isAuth from "../middleware/isAuth.js";
import { 
    editProfile, 
    getCurretUser, 
    suggestedUsers, 
    getProfile 
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurretUser);
userRouter.get("/suggested", isAuth, suggestedUsers);
userRouter.post("/editProfile", isAuth, upload.single("profileImage"), editProfile);
userRouter.get("/profile/:userName", isAuth, getProfile);

export default userRouter;