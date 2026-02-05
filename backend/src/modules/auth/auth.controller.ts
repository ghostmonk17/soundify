import * as authService from "./auth.service";

export const signup = async (req: any, res: any) => {
  const tokens = await authService.signup(req.body.email, req.body.password);
  res.json(tokens);
};

export const login = async (req: any, res: any) => {
  const tokens = await authService.login(req.body.email, req.body.password);
  res.json(tokens);
};
