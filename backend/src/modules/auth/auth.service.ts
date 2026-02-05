import { User } from "../../models/user.model";
import { hashPassword, comparePassword } from "../../utils/hash";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

export const signup = async (email: string, password: string) => {
  const hashed = await hashPassword(password);
  const user = await User.create({ email, password: hashed });

  return {
    accessToken: generateAccessToken({ id: user._id }),
    refreshToken: generateRefreshToken({ id: user._id })
  };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  return {
    accessToken: generateAccessToken({ id: user._id }),
    refreshToken: generateRefreshToken({ id: user._id })
  };
};
