import inputCheck from "../../helper/inputcheck.js";
import UserModel from "../../models/user.js";
import { sendTokenResponse } from "../../utils/jwt.js";

//#region User Login
export const login = async (req, res, next) => {
  try {
    const { username, password } = inputCheck(req, next);

    let user = await UserModel.findOne({ username }).select("+password");

    if (!user)
      return next(new ErrorHandler("User not found. Please register", 404));

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(new ErrorHandler("Invalid password", 400));

    user = await UserModel.findByIdAndUpdate(
      user._id,
      { isOnline: true },
      { returnDocument: "after" }
    );

    sendTokenResponse(res, user, 200, "User Login Successfully");
  } catch (error) {
    next(error);
  }
};
//#endregion
