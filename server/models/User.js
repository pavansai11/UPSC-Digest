import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  githubId: { type: String },
});

const User = mongoose.model("User", UserSchema);

export default User;
