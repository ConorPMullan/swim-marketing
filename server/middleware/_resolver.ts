import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { logger } from "../utils/logger";

const resolver = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.info(errors);
    return res.status(StatusCodes.NOT_FOUND).json({ errors: errors.array() });
  }
  next();
};

export { resolver };
