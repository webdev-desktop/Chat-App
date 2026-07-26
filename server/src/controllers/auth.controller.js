//#region User Register
export const register = async (req, res, next) => {
  try {
    const name = req.body?.name?.trim().replace(/\s+/g, " ") || "";
    const email = req.body?.email?.trim().toLowerCase() || "";
    const username =
      req.body?.username?.trim().toLowerCase().replace(/\s+/g, "") || "";
    const phone = req.body?.phone?.trim() || "";
    const password = req.body?.password?.trim() || "";
    const bio = req.body?.bio?.trim();
    const avatar = req.file?.secure_url || "";

    if (!name || !email || !username || !password)
      return next(new ErrorHandler("All fields required", 400));

    if (/\s/.test(password))
      return next(new ErrorHandler("Password cannot contain spaces", 400));

    const existsEmailId = await User.findOne({ email });
    if (existsEmailId)
      return next(
        new ErrorHandler("Email already registered. Please login", 409)
      );

    const existsUserName = await User.findOne({ username });
    if (existsUserName)
      return next(
        new ErrorHandler(
          "User-Name already registered. Please use Different User Name",
          409
        )
      );

    const existsPhone = phone && (await User.findOne({ phone }));
    if (existsPhone)
      return next(
        new ErrorHandler(
          "Phone number already in use. Please use Different Phone Number",
          409
        )
      );

    const user = await User.create({
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
