import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 100
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
    match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letter(s), number(s) & underscore(s)"],
  },
  password: {
    type: String,
    required: true,
    match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, "Password must contain letter(s), number(s), and special character(s)"],
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
