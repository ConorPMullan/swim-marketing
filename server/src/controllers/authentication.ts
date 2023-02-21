import { Request, Response } from "express";
import { AuthService } from "./../services/authentication";

const authenticate = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const authenticationTokens = await AuthService.authenticate(email, password);
  res.status(200).json(authenticationTokens);
};

const refresh = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const authenticationTokens = await AuthService.refresh(userId);
  res.status(200).json(authenticationTokens);
};

export { authenticate, refresh };
