import express from "express";
import { AppointmentController } from "../controllers/appointments";

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
   */ "/:id",
  AppointmentController.getAppointmentById
);
AppointmentRouter.get(
  "/appointment/:id",
  AppointmentController.getAppointmentsByUser
);
AppointmentRouter.get(
  "/client/:id",
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
   */ "/:id",
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
   *               name:
   *                type: string
   *                description: The appointment's name.
   *                example: John Graham
   *               email:
   *                type: string
   *                description: The appointment's email.
   *                example: example@mail.com
   *               password:
   *                type: string
   *                description: The appointment's password.
   *                example: password1@
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
