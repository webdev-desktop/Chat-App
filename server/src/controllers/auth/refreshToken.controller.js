import UserModel from "../../models/user.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import { generateTokens, verifyRefreshToken } from "../../utils/jwt.js";
import response from "../../utils/response.js";

//#region Refresh Token
export default async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) return next(new ErrorHandler("No token provided", 401));

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded)
      return next(new ErrorHandler("Invalid or expired refresh token", 401));

    const user = await UserModel.findById(decoded.id).select("_id");
    if (!user) return next(new ErrorHandler("User not found", 404));

    const { accessToken } = generateTokens({ id: user._id });

    response(res, accessToken, "New access token generated", 201);
  } catch (error) {
    next(error);
  }
}
//#endregion
