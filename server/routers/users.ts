import express from "express";
import { UserController } from "../controllers/users";
import { resolver } from "./../middleware/_resolver";
import { body } from "express-validator";
const UserRouter = express.Router();

//PUBLIC endpoints

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *               id:
 *                type: integer
 *                description: The user ID.
 *                example: 1
 *               name:
 *                type: string
 *                description: The user's name.
 *                example: John Graham
 *               email:
 *                type: string
 *                description: The user's email.
 *                example: example@mail.com
 *               user_level_id:
 *                type: integer
 *                description: The user's access level ID.
 *                example: 1
 */

UserRouter.get(
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Retrieve all users.
   *     description: Retrieves a user object array.
   *     tags:
   *      - users
   *     responses:
   *       200:
   *         description: A valid array of users object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */ "",
  UserController.getAllUsers
);

UserRouter.get(
  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Retrieve all users by id.
   *     description: Retrieves a user object based on its id.
   *     tags:
   *      - users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the user to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid user object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */ "/:id(\\d+)",
  UserController.getUserById
);
UserRouter.put(
  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Update a user details by id.
   *     description: Updates a user object based on its id.
   *     tags:
   *      - users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the user to update.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid user object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */ "/:id",
  [
    body("id").isNumeric(),
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
    body("user_level_id").isNumeric(),
  ],
  resolver,
  UserController.updateUserDetails
);

UserRouter.delete(
  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Delete a user details by id.
   *     description: Deletes a user object based on its id.
   *     tags:
   *      - users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the user to delete.
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: The user has been deleted.
   */ "/:id(\\d+)",
  UserController.deleteUserById
);

export { UserRouter };
