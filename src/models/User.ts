import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, require: true},
  isVerified: {type: Boolean, require: true},
  refreshToken: {type: String, require: true, unique: true},
  profileImage: String,
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
});

const User = mongoose.model("User", userSchema);

export default User;
