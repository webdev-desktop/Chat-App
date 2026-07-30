import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [20, "Name cannot exceed 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    username: {
      type: String,
      required: [true, "User Name is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [2, "User Name must be at least 2 characters"],
      maxlength: [20, "User Name cannot exceed 20 characters"],
    },
    phone: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // never returned in queries by default
    },
    bio: {
      type: String,
      default: "Hey there! I am using Chat App",
      trim: true,
      maxlength: [100, "Bio cannot exceed 100 characters"],
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    avatar: { type: String, default: "" },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Pre-save: 🔐 Hash password ──────────────────────────────────────
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12;

  this.password = await bcrypt.hash(this.password, saltRounds);
});

// ─── Instance method: 🔑 Compare password ──────────────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
