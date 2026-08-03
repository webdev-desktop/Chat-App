import express from "express";
import isAuthentication from "../middlewares/auth.js";
import profile from "../controllers/user/profile.controller.js";
import findUser from "../controllers/user/findUser.controller.js";
import updateProfile from "../controllers/user/updateProfile.controller.js";

const userRoutes = express.Router();

// userRoutes.get("/me", isAuthentication, allUsers);

userRoutes
  .route("/me")
  .all(isAuthentication)
  // GET    /api/v1/user/me
  .get(profile)
  // PUT    /api/v1/user/me
  .put(updateProfile);
// // DELETE /api/v1/user/me
// .delete(deleteProfile);

userRoutes.get("/search", isAuthentication, findUser);

export default userRoutes;
