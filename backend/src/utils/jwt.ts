import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  console.warn("⚠️ JWT secrets are missing in .env");
}

export const generateAccessToken = (payload: JwtPayload) => {
  if (!ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET not set");
  }

  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m"
  });
};

export const generateRefreshToken = (payload: JwtPayload) => {
  if (!REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET not set");
  }

  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d"
  });
};
