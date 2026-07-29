import inputCheck from "../helper/inputcheck.js";
import UserModel from "../models/user.js";
import { response } from "../utils/jwt.js";

export const allUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({ _id: { $ne: req.user._id } });
    if (!users) return next(new ErrorHandler("User not found.", 404));
    response(res, users, 200, "All Users List");
  } catch (error) {
    next(error);
  }
};

export const findUser = async (req, res, next) => {
  try {
    const { username } = inputCheck(req, next, "find");

    const existsUser = await UserModel.findOne({ username });
    if (!existsUser)
      return next(
        new ErrorHandler("Username is not exist please Check UserName", 409)
      );

    response(res, existsUser, 200, "User List");
  } catch (error) {
    next(error);
  }
};
