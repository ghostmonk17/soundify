import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

const JWT_SECRET = process.env.JWT_ACCESS_SECRET;

if (!JWT_SECRET) {
  console.warn("⚠️ JWT_ACCESS_SECRET is missing in .env");
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET as string) as {
      id: string;
      exp?: number;
    };

    req.userId = payload.id;

    next();
  } catch (err: any) {
    console.error("❌ Auth Error:", err.message);

    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};
