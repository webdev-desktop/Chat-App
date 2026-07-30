import ErrorHandler from "../utils/ErrorHandler.js";

export default function registerValidator(req) {
  const name = req?.body?.name?.trim().replace(/\s+/g, " ") || "";
  const email = req?.body?.email?.trim().toLowerCase() || "";
  const phone = req?.body?.phone?.trim() || undefined;
  const bio = req?.body?.bio?.trim() || "";
  const avatar = req?.file?.secure_url || "";
  const password = req?.body?.password?.trim() || "";
  const rawUsername = req.body?.username?.trim() || "";
  const username = rawUsername.toLowerCase() || "";

  if (!name || !email || !rawUsername || !password)
    throw new ErrorHandler(
      "All required fields (name, email, username, password) must be filled",
      400
    );

  if (/\s/.test(password))
    throw new ErrorHandler("Password cannot contain spaces", 400);

  const usernameRegex = /^[a-z0-9_]+$/;
  if (!usernameRegex.test(rawUsername))
    throw new ErrorHandler(
      "Username must contain only lowercase letters, numbers, and underscores.",
      400
    );

  return { name, email, phone, bio, avatar, username, password };
}
