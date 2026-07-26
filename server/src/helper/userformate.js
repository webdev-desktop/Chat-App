export const formatPublicUser = (user) => ({
  _id: user._id,
  name: user.name,
  username: user.username,
  bio: user.bio,
  avatar: user.avatar,
  isOnline: user.isOnline,
  lastSeen: user.lastSeen,
});
export const formatPrivateUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  username: user.username,
  phone: user.phone,
  bio: user.bio,
  avatar: user.avatar,
  isVerified: user.isVerified,
  isOnline: user.isOnline,
  lastSeen: user.lastSeen,
});
