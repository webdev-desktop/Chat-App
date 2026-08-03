import UserModel from "../../models/user.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import userResponse from "../../utils/userResponse.js";

export default async function findUser(req, res, next) {
  try {
    const username = req.query.username?.trim().toLowerCase();

    const existsUser = await UserModel.findOne({ username });
    if (!existsUser)
      return next(
        new ErrorHandler("Username is not exist please Check UserName", 404)
      );

    userResponse(res, 200, existsUser, "User Found");
  } catch (error) {
    next(error);
  }
}
