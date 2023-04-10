import express from "express";
import { InfluencerController } from "../controllers/influencers";
import { CampaignController } from "../controllers/campaigns";
import { body } from "express-validator";
import { resolver } from "../middleware/_resolver";

const InfluencerRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Influencer:
 *       type: object
 *       properties:
 *               id:
 *                type: integer
 *                description: The influencer ID.
 *                example: 1
 *               influencer_name:
 *                type: string
 *                description: The influencer's name.
 *                example: February Promotion
 *               email:
 *                type: string
 *                description: The influencer's email address.
 *                example: example@example.com
 *               price_per_post:
 *                type: string
 *                description: The influencer's price per post.
 *                example: 150
 *               is_active:
 *                type: boolean
 *                description: Is the influencer available/still active.
 *                example: true
 */

//PUBLIC endpoints

InfluencerRouter.get(
  /**
   * @swagger
   * /influencers:
   *   get:
   *     summary: Retrieve all influencers.
   *     description: Retrieves a influencer object array.
   *     tags:
   *      - influencers
   *     responses:
   *       200:
   *         description: A valid array of influencers object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Influencer'
   */ "",
  InfluencerController.getAllInfluencers
);

//PRIVATE endpoints

InfluencerRouter.get(
  /**
   * @swagger
   * /influencers/{id}:
   *   get:
   *     summary: Retrieve all influencers by id.
   *     description: Retrieves a influencer object based on its id.
   *     tags:
   *      - influencers
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the influencer to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid influencer object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Influencer'
   */ "/:id(\\d+)",
  InfluencerController.getInfluencerById
);
InfluencerRouter.get(
  /**
   * @swagger
   * /influencers/{id}/campaigns:
   *   get:
   *     summary: Retrieve all campaigns by influencer id.
   *     description: Retrieves an array of campaign objects based on its associated influencer id.
   *     tags:
   *      - influencers
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Influencer ID of the campaigns to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid campaigns object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Campaign'
   */
  "/:id(\\d+)/campaigns",
  CampaignController.getCampaignsByInfluencers
);
InfluencerRouter.put(
  /**
   * @swagger
   * /influencers/{id}:
   *   put:
   *     summary: Update a influencer details by id.
   *     description: Updates a influencer object based on its id.
   *     tags:
   *      - influencers
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the influencer to update.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid influencer object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Influencer'
   */ "/",
  [
    body("id").isNumeric(),
    body("influencer_name").isString().isLength({ min: 2 }).trim(),
    body("price_per_post").isString().isLength({ min: 2 }).trim(),
    body("email").isString().isLength({ min: 3 }).isEmail().normalizeEmail(),
    body("is_active").isBoolean(),
    body("platform_id").isNumeric(),
  ],
  resolver,
  InfluencerController.updateInfluencerDetails
);
InfluencerRouter.post(
  /**
   * @swagger
   * /influencers/{id}:
   *   post:
   *     summary: Create a new influencer.
   *     description: Creates a new influencer object.
   *     tags:
   *      - influencers
   *     parameters:
   *       - in: body
   *         name: influencerDetails
   *         required: true
   *         description: Numeric ID of the influencer to update.
   *         schema:
   *           type: object
   *           items:
   *               name:
   *                type: string
   *                description: The influencer's name.
   *                example: John Graham
   *               email:
   *                type: string
   *                description: The influencer's email.
   *                example: example@mail.com
   *               password:
   *                type: string
   *                description: The influencer's password.
   *                example: password1@
   *     responses:
   *       201:
   *         description: Created a new influencer.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Influencer'
   */ "/",
  [
    body("influencer_name").isString().isLength({ min: 2 }).trim(),
    body("price_per_post").isString().isLength({ min: 2 }).trim(),
    body("email").isString().isLength({ min: 3 }).isEmail().normalizeEmail(),
    body("is_active").isBoolean(),
    body("platform_id").isNumeric(),
  ],
  resolver,
  InfluencerController.createInfluencer
);
InfluencerRouter.delete(
  /**
* @swagger
* /influencers/{id}:
*   delete:
*     summary: Delete a influencer details by id.
*     description: Deletes a influencer object based on its id.
*     tags: 
*      - influencers
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID of the influencer to delete.
*         schema:
*           type: integer
*     responses:
*       204:
*         description: The influencer has been deleted.

*/ "/",
  InfluencerController.deleteInfluencerById
);

export { InfluencerRouter };
