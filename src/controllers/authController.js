import User from "../models/user.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async function (req, res, next) {
  const { name, email, password } = req.body;

  //basic validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  //check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  //send response
  const savedUser = await User.create({ name, email, password });

  return res.status(201).json({
    success: true,
    user: {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
    },
  });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  //validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "all fields are required",
    });
  }

  //find user
  const user = await User.findOne({ email }).select("+password");

  //send error response if user not exist
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "invalid username or password",
    });
  }
  //compare the passwords
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "invalid username or password",
    });
  }

  //generate token
  const token = generateToken(user._id, user.role);

  //send success response
  return res.status(20).json({
    success: true,
    message: "login successfull",
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};
