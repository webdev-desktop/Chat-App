import UserModel from "../../models/user.js";
import { clearToken } from "../../utils/jwt.js";

//#region User Logout
export default async function logout(req, res, next) {
  try {
    await UserModel.findByIdAndUpdate(req.user._id, {
      isOnline: false,
      lastSeen: new Date(),
    });
    clearToken(res, 200, "User logout Successfully!");
  } catch (error) {
    next(error);
  }
}
//#endregion
