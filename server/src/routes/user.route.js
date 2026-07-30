import express from "express";
import isAuthentication from "../middlewares/auth.js";
// import { allUsers, findUser } from "../controllers/user.controller.js";
import { profile } from "../controllers/user/profile.controller.js";

const userRoutes = express.Router();

// userRoutes.get("/me", isAuthentication, allUsers);

userRoutes
  .route("/me")
  .all(isAuthentication)
  // GET    /api/v1/user/me
  .get(profile);
// PUT    /api/v1/user/me
// .put(upload.single("profilePic"), updateProfile)
// // DELETE /api/v1/user/me
// .delete(deleteProfile);

export default userRoutes;
