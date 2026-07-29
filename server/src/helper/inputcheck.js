import ErrorHandler from "../middlewares/error.js";

export default function inputCheck(req, next, type = "login") {
  const username =
    req?.body?.username?.trim().toLowerCase().replace(/\s+/g, "") || "";
  const password = req?.body?.password?.trim() || "";

  if (type === "find") {
    if (!username)
      return next(new ErrorHandler("Username is required to find user", 400));

    return { username };
  }

  if (type === "login") {
    if (!username || !password)
      return next(new ErrorHandler("Username and password are required", 400));

    return { username, password };
  }

  if (type === "register") {
    const name = req?.body?.name?.trim().replace(/\s+/g, " ") || "";
    const email = req?.body?.email?.trim().toLowerCase() || "";
    const phone = req?.body?.phone?.trim() || "";
    const bio = req?.body?.bio?.trim() || "";
    const avatar = req?.file?.secure_url || "";

    if (!name || !email || !username || !password)
      return next(
        new ErrorHandler(
          "All required fields (name, email, username, password) must be filled",
          400
        )
      );

    if (/\s/.test(password))
      return next(new ErrorHandler("Password cannot contain spaces", 400));

    return { name, email, username, phone, password, bio, avatar };
  }

  return next(new ErrorHandler("Invalid operation type", 400));
}
