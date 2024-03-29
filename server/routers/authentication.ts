import express from "express";
import { validate } from "../utils/validation";
import { check } from "express-validator";
import { authenticate, refresh } from "./../controllers/authentication";
import { logger } from "../utils/logger";

const AuthenticationRouter = express.Router();

/**
 * @swagger
 * /api/authenticate/refresh:
 *   get:
 *     tags: [
 *       Authenticate
 *     ]
 *     summary: if validated return token
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Error
 */
AuthenticationRouter.route("/refresh").get(refresh);

/**
 * @swagger
 * /api/authenticate:
 *   post:
 *     tags: [
 *       Authenticate
 *     ]
 *     summary: Authenticate user
 *     requestBody:
 *         description: JSON object used for authentication
 *         content:
 *          application/json:
 *                schema:
 *                  type: object
 *                  required:
 *                    - email
 *                    - password
 *                  properties:
 *                      email:
 *                          type: string
 *                          example: admin@email.com
 *                      password:
 *                          type: string
 *                          example: password1!
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Error
 */
AuthenticationRouter.route("/").post(
  [
    check("email").isString().isLength({ min: 3 }).isEmail(),
    check("password").isLength({ min: 8, max: 15 }),
  ],
  validate,
  authenticate
);

export { AuthenticationRouter };
