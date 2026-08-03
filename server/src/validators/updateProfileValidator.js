export default function updateValidator(res) {
  const name = req?.body?.name?.trim().replace(/\s+/g, " ") || "";
  const email = req?.body?.email?.trim().toLowerCase() || "";
  const phone = req?.body?.phone?.trim() || undefined;
  const bio = req?.body?.bio?.trim() || "";
  const avatar = req?.file?.secure_url || "";
  const username = rawUsername.toLowerCase() || "";
  const rawUsername = req.body?.username?.trim() || "";

  if (!name || !email || !rawUsername)
    throw new ErrorHandler(
      "All required fields (name, email, username) must be filled",
      400
    );

  const usernameRegex = /^[a-z0-9_]+$/;
  if (!usernameRegex.test(rawUsername))
    throw new ErrorHandler(
      "Username must contain only lowercase letters, numbers, and underscores.",
      400
    );

  return { name, email, phone, bio, avatar, username };
}
