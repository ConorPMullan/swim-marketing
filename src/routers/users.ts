import express from "express";
import { UserController } from "../controllers/users";

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

//PRIVATE endpoints

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
   */ "/:id",
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
  UserController.updateUserDetails
);
UserRouter.post(
  /**
   * @swagger
   * /users/{id}:
   *   post:
   *     summary: Create a new user.
   *     description: Creates a new user object.
   *     tags:
   *      - users
   *     parameters:
   *       - in: body
   *         name: userDetails
   *         required: true
   *         description: Numeric ID of the user to update.
   *         schema:
   *           type: object
   *           items:
   *               name:
   *                type: string
   *                description: The user's name.
   *                example: John Graham
   *               email:
   *                type: string
   *                description: The user's email.
   *                example: example@mail.com
   *               password:
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
   *                 $ref: '#/components/schemas/User'
   */
  "/",
  UserController.createUser
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

*/ "/",
  UserController.deleteUserById
);

export { UserRouter };
