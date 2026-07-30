import validateInput from "../../helpers/validateInput.js";
import UserModel from "../../models/user.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import userResponse from "../../utils/userResponse.js";

export const findUser = async (req, res, next) => {
  try {
    const { username } = validateInput(req, "find");

    const existsUser = await UserModel.findOne({ username });
    if (!existsUser)
      return next(
        new ErrorHandler("Username is not exist please Check UserName", 409)
      );

    userResponse(res, 200, existsUser, "User List");
  } catch (error) {
    next(error);
  }
};

export const profile = async (req, res, next) => {
  try {
    userResponse(
      res,
      200,
      req.user,
      "Profile fetched successfully.",
      "private"
    );
  } catch (error) {
    next(error);
  }
};
