import inputCheck from "../../helper/inputcheck.js";
import ErrorHandler from "../../middlewares/error.js";
import UserModel from "../../models/user.js";
import { sendTokenResponse } from "../../utils/jwt.js";

//#region User Register
export const register = async (req, res, next) => {
  try {
    const { name, email, username, phone, password, bio, avatar } = inputCheck(
      req,
      next,
      "register"
    );

    const existsEmailId = await UserModel.findOne({ email });
    if (existsEmailId)
      return next(
        new ErrorHandler("Email already registered. Please login", 409)
      );

    const existsUserName = await UserModel.findOne({ username });
    if (existsUserName)
      return next(
        new ErrorHandler(
          "User-Name already registered. Please use Different User Name",
          409
        )
      );

    const existsPhone = phone && (await UserModel.findOne({ phone }));
    if (existsPhone)
      return next(
        new ErrorHandler(
          "Phone number already in use. Please use Different Phone Number",
          409
        )
      );

    const user = await UserModel.create({
      name,
      email,
      username,
      password,
      avatar,
      phone,
      bio,
      isOnline: true,
    });

    sendTokenResponse(res, user, 201, "User Registered Successfully!");
  } catch (error) {
    next(error);
  }
};
//#endregion
