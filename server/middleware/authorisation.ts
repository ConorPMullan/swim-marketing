import { Request, Response, NextFunction } from "express";

const authorise = async (req: Request, res: Response, next: NextFunction) => {
  if (req.path === "/api/users" && req.method === "GET") {
    const isAdmin = res.locals.role_id === 1;
    if (!isAdmin) {
      return res.status(403).json({
        error: "Unauthorized",
      });
    }
    return next();
  }
  return next();
};

export { authorise };
