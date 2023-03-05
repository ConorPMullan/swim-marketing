import express from "express";
import { AppointmentController } from "../controllers/appointments";
import { resolver } from "../middleware/_resolver";
import { body } from "express-validator";

const AppointmentRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *               id:
 *                type: integer
 *                description: The appointment ID.
 *                example: 1
 *               description:
 *                type: string
 *                description: The appointment's title/description.
 *                example: February Promotion
 *               scheduled_date_time:
 *                type: Date
 *                description: The appointment's start date/time.
 *                example: 2023-02-01 09:30
 *               duration:
 *                type: number
 *                description: The appointment's duration in minutes.
 *                example: 60
 *               location:
 *                type: string
 *                description: The location of the appointment.
 *                example: zoom.link
 */

//PUBLIC endpoints

AppointmentRouter.get(
  /**
   * @swagger
   * /appointments:
   *   get:
   *     summary: Retrieve all appointments.
   *     description: Retrieves a appointment object array.
   *     tags:
   *      - appointments
   *     responses:
   *       200:
   *         description: A valid array of appointments object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Appointment'
   */
  "",
  AppointmentController.getAllAppointments
);

//PRIVATE endpoints

AppointmentRouter.get(
  /**
   * @swagger
   * /appointments/{id}:
   *   get:
   *     summary: Retrieve all appointments by id.
   *     description: Retrieves a appointment object based on its id.
   *     tags:
   *      - appointments
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the appointment to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid appointment object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Appointment'
   */ "/:id(\\d+)",
  AppointmentController.getAppointmentById
);
AppointmentRouter.get(
  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Retrieve all appointments by user id.
   *     description: Retrieves a appointment object based on its user id.
   *     tags:
   *      - appointments
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: User ID of the appointment to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid appointment object array.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Appointment'
   */
  "/users/:id(\\d+)",
  AppointmentController.getAppointmentsByUser
);
AppointmentRouter.get(
  /**
   * @swagger
   * /clients/{id}:
   *   get:
   *     summary: Retrieve all appointments by client id.
   *     description: Retrieves a appointment object based on its client id.
   *     tags:
   *      - appointments
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Client ID of the appointment to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid appointment object array.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Appointment'
   */
  "/client/:id(\\d+)",
  AppointmentController.getAppointmentsByClient
);
AppointmentRouter.put(
  /**
   * @swagger
   * /appointments/{id}:
   *   put:
   *     summary: Update a appointment details by id.
   *     description: Updates a appointment object based on its id.
   *     tags:
   *      - appointments
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the appointment to update.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid appointment object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Appointment'
   */ "/",
  [
    body("location").isString().isLength({ min: 2 }).trim(),
    body("description").isString().isLength({ min: 2 }).trim(),
    body("id").isNumeric(),
    body("end_date_time").exists(),
    body("scheduled_date_time").exists(),
  ],
  resolver,
  AppointmentController.updateAppointmentDetails
);
AppointmentRouter.post(
  /**
   * @swagger
   * /appointments/{id}:
   *   post:
   *     summary: Create a new appointment.
   *     description: Creates a new appointment object.
   *     tags:
   *      - appointments
   *     parameters:
   *       - in: body
   *         name: appointmentDetails
   *         required: true
   *         description: Numeric ID of the appointment to update.
   *         schema:
   *           type: object
   *           items:
   *               description:
   *                type: string
   *                description: The appointment's title/description.
   *                example: John Graham
   *               scheduled_date_time:
   *                type: Date
   *                description: The appointment's start date/time.
   *                example: 2023-02-01 09:30
   *               duration:
   *                type: number
   *                description: The appointment's duration in minutes.
   *                example: 60
   *               location:
   *                type: string
   *                description: The location of the appointment.
   *                example: zoom.link
   *               user_id:
   *                type: number
   *                description: The user id associated with the appointment.
   *                example: 1
   *               client_id:
   *                type: number
   *                description: The client id associated with the appointment.
   *                example: 1
   *     responses:
   *       201:
   *         description: Created a new appointment.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Appointment'
   */ "/",
  [
    body("location").isString().isLength({ min: 2 }).trim(),
    body("description").isString().isLength({ min: 2 }).trim(),
    body("user_id").isNumeric(),
    body("client_id").isNumeric(),
    body("end_date_time").exists(),
    body("scheduled_date_time").exists(),
  ],
  resolver,
  AppointmentController.createAppointment
);
AppointmentRouter.delete(
  /**
* @swagger
* /appointments/{id}:
*   delete:
*     summary: Delete a appointment details by id.
*     description: Deletes a appointment object based on its id.
*     tags: 
*      - appointments
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID of the appointment to delete.
*         schema:
*           type: integer
*     responses:
*       204:
*         description: The appointment has been deleted.

*/ "/",
  AppointmentController.deleteAppointmentById
);

export { AppointmentRouter };
