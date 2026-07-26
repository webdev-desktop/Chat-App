import UserModel from "../models/user.js";

export const allUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({ _id: { $ne: req.user._id } });
    response(res, 200, "All Users List", users);
  } catch (error) {
    next(error);
  }
};
