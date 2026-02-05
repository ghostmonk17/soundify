import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const tokens = await authService.signup(email, password);

    res.json(tokens);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const tokens = await authService.login(email, password);

    res.json(tokens);
  } catch (err) {
    next(err);
  }
};
