import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authenticationConst } from "../constants";
import { logger } from "../utils/logger";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = authenticationConst;

const handleTest = (res: Response, next: NextFunction) => {
  res.locals.user_id = 1;
  return next();
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "test") return handleTest(res, next);
  if (
    (req.path === "/api/authenticate" || req.path === "/users") &&
    req.method == "POST"
  ) {
    logger.info("next");
    return next();
  }

  const splitAuth = req.headers.authorization?.split(" ");
  const token = splitAuth && splitAuth.length >= 2 && splitAuth[1];
  console.log("BLUE");
  console.log("RECEIVED TOKEN", req.headers.authorization);
  console.log("SPLUT TOKEN", token);
  if (token) {
    try {
      console.log("PATH IS", req.path);
      const tokenVerified = checkTokenValidity(
        token,
        req.path === "/api/authenticate/refresh"
          ? REFRESH_TOKEN_SECRET
          : ACCESS_TOKEN_SECRET
      );

      if (tokenVerified) {
        console.log("token verified", tokenVerified);
        res.locals.userId = tokenVerified.sub;
        res.locals.role_id = tokenVerified.roles;
        return next();
      }
    } catch {
      return res.status(401).json({
        error: "Access Denied",
      });
    }
  }
  res.status(401).json({
    error: "Access Denied",
  });
};

const checkTokenValidity = (token, secret) => {
  return jwt.verify(token, secret);
};

export { verifyToken };
