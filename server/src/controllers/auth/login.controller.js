import validateInput from "../../validators/validateInput.js";
import UserModel from "../../models/user.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import { sendTokenResponse } from "../../utils/jwt.js";

//#region User Login
export default async function login(req, res, next) {
  try {
    const { username, password } = validateInput(req);

    let user = await UserModel.findOne({ username }).select("+password");

    if (!user)
      return next(new ErrorHandler("Invalid username or password", 401));

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return next(new ErrorHandler("Invalid username or password", 401));

    user = await UserModel.findByIdAndUpdate(
      user._id,
      { isOnline: true },
      { returnDocument: "after" }
    );

    sendTokenResponse(res, user, 200, "User Login Successfully");
  } catch (error) {
    next(error);
  }
}
//#endregion
