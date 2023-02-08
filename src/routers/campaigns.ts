import express from "express";
import { CampaignController } from "../controllers/campaigns";
import { InfluencerController } from "../controllers/influencers";
import { body } from "express-validator";
import { resolver } from "../middleware/_resolver";

const CampaignRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       properties:
 *               id:
 *                type: integer
 *                description: The campaign ID.
 *                example: 1
 *               campaign_name:
 *                type: string
 *                description: The campaign's name.
 *                example: February Promotion
 *               campaign_start_date:
 *                type: Date
 *                description: The campaign's start date.
 *                example: 2023-02-01
 *               campaign_end_date:
 *                type: Date
 *                description: The campaign's end date.
 *                example: 2023-02-07
 */

//PUBLIC endpoints

CampaignRouter.get(
  /**
   * @swagger
   * /campaigns:
   *   get:
   *     summary: Retrieve all campaigns.
   *     description: Retrieves a campaign object array.
   *     tags:
   *      - campaigns
   *     responses:
   *       200:
   *         description: A valid array of campaigns object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Campaign'
   */ "",
  CampaignController.getAllCampaigns
);

//PRIVATE endpoints

CampaignRouter.get(
  /**
   * @swagger
   * /campaigns/{id}:
   *   get:
   *     summary: Retrieve all campaigns by id.
   *     description: Retrieves a campaign object based on its id.
   *     tags:
   *      - campaigns
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the campaign to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid campaign object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Campaign'
   */ "/:id",
  CampaignController.getCampaignById
);
CampaignRouter.get(
  /**
   * @swagger
   * /campaigns/{id}/influencers:
   *   get:
   *     summary: Retrieve all influencers by campaign id.
   *     description: Retrieves an array of influencers object based on its associated campaign id.
   *     tags:
   *      - campaigns
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Campaign ID of the influencers to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid influencer object array.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Influencer'
   */
  "/:id/influencers",
  InfluencerController.getInfluencersByCampaign
);
CampaignRouter.put(
  /**
   * @swagger
   * /campaigns/{id}:
   *   put:
   *     summary: Update a campaign details by id.
   *     description: Updates a campaign object based on its id.
   *     tags:
   *      - campaigns
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the campaign to update.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A valid campaign object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Campaign'
   */ "/",
  [
    body("id").isNumeric(),
    body("campaign_name").isString().isLength({ min: 2 }).trim(),
    body("campaign_start_date").exists(),
    body("end_date").exists(),
    body("client_id").isNumeric(),
  ],
  resolver,
  CampaignController.updateCampaignDetails
);
CampaignRouter.post(
  /**
   * @swagger
   * /campaigns/{id}:
   *   post:
   *     summary: Create a new campaign.
   *     description: Creates a new campaign object.
   *     tags:
   *      - campaigns
   *     parameters:
   *       - in: body
   *         name: campaignDetails
   *         required: true
   *         description: Numeric ID of the campaign to update.
   *         schema:
   *           type: object
   *           items:
   *               name:
   *                type: string
   *                description: The campaign's name.
   *                example: John Graham
   *               email:
   *                type: string
   *                description: The campaign's email.
   *                example: example@mail.com
   *               password:
   *                type: string
   *                description: The campaign's password.
   *                example: password1@
   *     responses:
   *       201:
   *         description: Created a new campaign.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Campaign'
   */ "/",
  [
    body("campaign_name").isString().isLength({ min: 2 }).trim(),
    body("campaign_start_date").exists(),
    body("end_date").exists(),
    body("client_id").isNumeric(),
  ],
  resolver,
  CampaignController.createCampaign
);
CampaignRouter.delete(
  /**
* @swagger
* /campaigns/{id}:
*   delete:
*     summary: Delete a campaign details by id.
*     description: Deletes a campaign object based on its id.
*     tags: 
*      - campaigns
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID of the campaign to delete.
*         schema:
*           type: integer
*     responses:
*       204:
*         description: The campaign has been deleted.

*/ "/",
  CampaignController.deleteCampaignById
);

export { CampaignRouter };
