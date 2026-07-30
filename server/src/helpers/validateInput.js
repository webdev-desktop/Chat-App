import ErrorHandler from "../utils/ErrorHandler.js";

export default function validateInput(req, type = "login") {
  const rawUsername = req.body?.username?.trim() || "";
  const username = rawUsername.toLowerCase() || "";
  const password = req?.body?.password?.trim() || "";

  if (type === "find") {
    if (!username)
      throw new ErrorHandler("Username is required to find user", 400);

    return { username };
  }

  if (type === "login") {
    if (!username || !password)
      throw new ErrorHandler("Username and password are required", 400);

    return { username, password };
  }

  throw new ErrorHandler("Invalid operation type", 400);
}
