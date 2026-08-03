import updateValidator from "../../validators/updateProfileValidator.js";
import UserModel from "../../models/user.js";
import response from "../../utils/response.js";
import userResponse from "../../utils/userResponse.js";

export default async function updateProfile(req, res, next) {
  try {
    const { name, email, username, phone, bio, avatar } = updateValidator(res);

    const conditions = [
      ...(email ? [{ email }] : []),
      ...(username ? [{ username }] : []),
      ...(phone ? [{ phone }] : []),
    ];

    if (conditions.length > 0) {
      const duplicate = await UserModel.findOne({
        _id: { $ne: req.user._id },
        $or: conditions,
      });

      if (duplicate) {
        if (email && duplicate.email === email)
          return next(new ErrorHandler("Email already in use", 400));
        if (username && duplicate.username === username)
          return next(new ErrorHandler("Username already in use", 400));
        if (phone && duplicate.phone === phone)
          return next(new ErrorHandler("Phone number already in use", 400));
      }
    }

    const user = await UserModel.findById(req.user._id);
    if (!user) return next(new ErrorHandler("User not found", 404));

    const updateData = {
      name,
      email,
      username,
      bio,
      ...(phone && { phone }),
      ...(avatar && { avatar }),
    };

    Object.assign(user, updateData);
    await user.save();

    userResponse(res, 200, user, "Profile Updated", "private");
  } catch (error) {
    next(error);
  }
}
