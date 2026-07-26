import UserModel from "../models/user.js";
import ErrorHandler from "./error.js";
import { verifyAccessToken } from "../config/jwt.js";

const isAuthentication = async (req, res, next) => {
  try {
    // 1. 🔥  Extract token | Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      return next(
        new ErrorHandler("User is not logged in. \n Please Login", 401)
      );

    const token = authHeader.split(" ")[1];

    // 2. 🔐 Verify token
    const decoded = verifyAccessToken(token);

    if (!decoded)
      return next(new ErrorHandler("Session Expired, Please Login Again", 401));

    // 3. 👤 Find user in correct collection

    const currentUser = await UserModel.findById(decoded.id).lean();

    if (!currentUser) return next(new ErrorHandler("User Not Found", 404));

    // ✅ Attach user
    req.user = currentUser;

    next();
  } catch (error) {
    next(error);
  }
};
export default isAuthentication;
