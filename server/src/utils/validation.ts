import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { logger } from "./logger";

function isValidId(id): boolean {
  if (id == undefined || id == null) return false;
  const matchValidInputForIdRegex = /^\d+$/g;
  return matchValidInputForIdRegex.test(`${id}`);
}

function isValidString(str): boolean {
  if (str == undefined || str == null) return false;
  const matchValidInputForIdRegex = new RegExp("^[a-zA-Z0-9 _.,/+:-]*$");
  return matchValidInputForIdRegex.test(`${str}`);
}

const validate = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(400).json({ error: error.array() });
  } else {
    next();
  }
};

export { validate, isValidId, isValidString };
