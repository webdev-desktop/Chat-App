import userResponse from "../../utils/userResponse.js";

export default async function profile(req, res, next) {
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
}
