import { Request, Response } from "express";
import { CampaignService } from "../services/campaigns";
import { Campaign, ICampaign, ICreateCampaign } from "../interfaces";
import { StatusCodes } from "http-status-codes";
import { isValidId } from "../utils/validation";

async function getAllCampaigns(req: Request, res: Response) {
  try {
    const campaigns = await CampaignService.getAllCampaigns();
    return res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json("Cannot access database");
  }
}

async function getCampaignById(req: Request, res: Response) {
  try {
    const campaignId = parseInt(req.params["id"]);
    if (!isValidId(campaignId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Requires valid campaignId");
    }
    const campaign = await CampaignService.getCampaignById(campaignId);
    return res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json("Cannot find campaign id");
  }
}

async function getCampaignsByInfluencers(req: Request, res: Response) {
  try {
    const influencerId = parseInt(req.params["id"]);
    if (!isValidId(influencerId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Requires valid influencerId");
    }
    const campaigns = await CampaignService.getCampaignsByInfluencer(
      influencerId
    );
    return res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json("Cannot find campaign id");
  }
}

async function getCampaignsByClients(req: Request, res: Response) {
  try {
    const clientId = parseInt(req.params["id"]);
    if (!isValidId(clientId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Requires valid clientId");
    }
    const campaigns = await CampaignService.getCampaignsByClient(clientId);
    return res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json("Cannot find campaign by client id");
  }
}

async function updateCampaignDetails(req: Request, res: Response) {
  try {
    const updateDetails: ICampaign = req.body;
    const updatedCampaign = await CampaignService.updateCampaignDetails(
      updateDetails
    );
    return res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json("Could not update campaign.");
  }
}

async function createCampaign(req: Request, res: Response) {
  try {
    const newCampaign: ICreateCampaign = req.body;
    const createdCampaign = await CampaignService.createCampaign(newCampaign);
    return res.status(200).json(createdCampaign);
  } catch (error) {
    res.status(500).json("Could not create campaign.");
  }
}

async function deleteCampaignById(req: Request, res: Response) {
  try {
    const { campaignId: campaignId } = req.body;
    if (!isValidId(campaignId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Requires valid campaignId");
    }
    const deletedCampaign = await CampaignService.deleteCampaignById(
      campaignId
    );
    return res.status(200).json(deletedCampaign);
  } catch (err) {
    return res.status(500).json("Cannot delete id");
  }
}

const CampaignController = {
  getAllCampaigns,
  getCampaignById,
  getCampaignsByInfluencers,
  getCampaignsByClients,
  createCampaign,
  updateCampaignDetails,
  deleteCampaignById,
};

export { CampaignController };
