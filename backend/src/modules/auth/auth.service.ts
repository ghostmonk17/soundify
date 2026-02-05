import { User } from "../../models/user.model";
import { hashPassword, comparePassword } from "../../utils/hash";
import {
  generateAccessToken,
  generateRefreshToken
} from "../../utils/jwt";

class AuthError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const signup = async (
  email: string,
  password: string
) => {
  const exists = await User.findOne({ email });

  if (exists) {
    throw new AuthError("Email already registered", 400);
  }

  const hashed = await hashPassword(password);

  const user = await User.create({
    email,
    password: hashed
  });

  return {
    accessToken: generateAccessToken({ id: user._id.toString() }),
    refreshToken: generateRefreshToken({ id: user._id.toString() })
  };
};

export const login = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthError("Invalid credentials", 401);
  }

  const isValid = await comparePassword(
    password,
    user.password
  );

  if (!isValid) {
    throw new AuthError("Invalid credentials", 401);
  }

  return {
    accessToken: generateAccessToken({ id: user._id.toString() }),
    refreshToken: generateRefreshToken({ id: user._id.toString() })
  };
};
