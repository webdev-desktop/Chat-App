import jwt from "jsonwebtoken";

/**
 *  🔐 Generate Tokens
 */
export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });

  return { accessToken, refreshToken };
};

/**
 * ✅ Verify Access Token
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log("JWT Access Token Error:", error.message);
    return null;
  }
};

/**
 * Attach token to response as httpOnly cookie + return in body 🍪 Send Tokens
 */
export const sendTokenResponse = (res, user, statusCode = 200, message) => {
  const entityObj = user.toObject();

  const payload = { id: entityObj._id };
  const { accessToken, refreshToken } = generateTokens(payload);

  const cookieOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  };

  //Refresh Token Cookies
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  const privateUser = formatPrivateUser(entityObj);

  return res.status(statusCode).json({
    success: true,
    accessToken,
    user: privateUser,
    message,
  });
};

/**
 * 🚪 Logout
 */
// export const clearToken = (
//   res,
//   statusCode = 200,
//   message = "Logged out successfully"
// ) => {
//   return res
//     .status(statusCode)
//     .cookie("refreshToken", "", {
//       httpOnly: true,
//       expires: new Date(Date.now()),
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       secure: process.env.NODE_ENV === "production",
//     })
//     .json({
//       success: true,
//       message,
//     });
// };
