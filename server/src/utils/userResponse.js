import { formatPrivateUser, formatPublicUser } from "../helpers/formatter.js";

export default function userResponse(
  res,
  statusCode = 200,
  user,
  message,
  type = "public"
) {
  const formattedUser =
    type === "private" ? formatPrivateUser(user) : formatPublicUser(user);

  return res.status(statusCode).json({
    success: true,
    user: formattedUser,
    message,
  });
}
