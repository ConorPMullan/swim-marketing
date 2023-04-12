import express from "express";
import { UserController } from "../controllers/users";
import { resolver } from "../middleware/_resolver";
import { body } from "express-validator";
const SignUpRouter = express.Router();

//PUBLIC endpoints

/**
 * @swagger
 * components:
 *   schemas:
 *     Sign Up:
 *       type: object
 *       properties:
 *               id:
 *                type: integer
 *                description: The user ID.
 *                example: 1
 *               user_name:
 *                type: string
 *                description: The user's name.
 *                example: John Graham
 *               email:
 *                type: string
 *                description: The user's email.
 *                example: example@mail.com
 *               user_password:
 *                type: string
 *                description: The user's password.
 *                example: password1!
 *               user_level_id:
 *                type: integer
 *                description: The user's access level ID.
 *                example: 1
 */

SignUpRouter.post(
  /**
   * @swagger
   * /signup/{id}:
   *   post:
   *     summary: Create a new user.
   *     description: Creates a new user object.
   *     tags:
   *      - signup
   *     parameters:
   *       - in: body
   *         name: userDetails
   *         required: true
   *         description: User details for signing up.
   *         schema:
   *           type: object
   *           items:
   *               user_name:
   *                type: string
   *                description: The user's name.
   *                example: John Graham
   *               email:
   *                type: string
   *                description: The user's email.
   *                example: example@mail.com
   *               user_password:
   *                type: string
   *                description: The user's password.
   *                example: password1@
   *     responses:
   *       201:
   *         description: Created a new user.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/SignUp'
   */
  "/",
  [
    body("email").isString().isLength({ min: 3 }).isEmail().normalizeEmail(),
    body("user_name").isString().isLength({ min: 2 }).trim(),
    body("user_password")
      .isString()
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one special character"),
  ],
  resolver,
  UserController.createUser
);

export { SignUpRouter };
