import express from "express";
import { ClientController } from "../controllers/clients";

const ClientRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *               id:
 *                type: integer
 *                description: The client ID.
 *                example: 1
 *               name:
 *                type: string
 *                description: The client's name.
 *                example: John Graham
 *               email:
 *                type: string
 *                description: The client's email.
 *                example: example@mail.com
 */

//PUBLIC endpoints
/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Retrieve all clients.
 *     description: Retrieves a client object array.
 *     tags:
 *      - clients
 *     responses:
 *       200:
 *         description: A valid array of clients object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */
ClientRouter.get("", ClientController.getAllClients);

//PRIVATE endpoints

ClientRouter.get(
  /**
   * @swagger
   * /clients/{id}:
   *   get:
   *     summary: Retrieve all clients by id.
   *     description: Retrieves a client object based on its id.
   *     tags:
   *      - clients
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the client to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid client object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Client'
   */ "/:id",
  ClientController.getClientById
);

ClientRouter.get("/users/:id", ClientController.getClientsByUserId);
ClientRouter.put(
  /**
   * @swagger
   * /clients/{id}:
   *   put:
   *     summary: Update a client details by id.
   *     description: Updates a client object based on its id.
   *     tags:
   *      - clients
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the client to update.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid client object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Client'
   */ "/:id",
  ClientController.updateClientDetails
);

ClientRouter.post(
  /**
   * @swagger
   * /clients/{id}:
   *   post:
   *     summary: Create a new client.
   *     description: Creates a new client object.
   *     tags:
   *      - clients
   *     parameters:
   *       - in: body
   *         name: clientDetails
   *         required: true
   *         description: Numeric ID of the client to update.
   *         schema:
   *           type: object
   *           items:
   *               name:
   *                type: string
   *                description: The client's name.
   *                example: John Graham
   *               email:
   *                type: string
   *                description: The client's email.
   *                example: example@mail.com
   *               password:
   *                type: string
   *                description: The client's password.
   *                example: password1@
   *     responses:
   *       201:
   *         description: Created a new client.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Client'
   */ "/",
  ClientController.createClient
);
ClientRouter.delete(
  /**
* @swagger
* /clients/{id}:
*   delete:
*     summary: Delete a client details by id.
*     description: Deletes a client object based on its id.
*     tags: 
*      - clients
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID of the client to delete.
*         schema:
*           type: integer
*     responses:
*       204:
*         description: The client has been deleted.

*/ "/",
  ClientController.deleteClientById
);

export { ClientRouter };
