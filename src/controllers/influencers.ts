import { Request, Response } from "express";
import { InfluencerService } from "../services/influencers";
import { Influencer, ICreateInfluencer } from "../interfaces";

async function getAllInfluencers(req: Request, res: Response) {
  try {
    const influencers = await InfluencerService.getAllInfluencers();
    return res.status(200).json(influencers);
  } catch (error) {
    res.status(401).json("Cannot access database");
  }
}

async function getInfluencerById(req: Request, res: Response) {
  try {
    const influencerId = parseInt(req.params["id"]);
    const influencer = await InfluencerService.getInfluencerById(influencerId);
    return res.status(200).json(influencer);
  } catch (error) {
    res.status(401).json("Cannot find influencer id");
  }
}

async function getInfluencersByCampaign(req: Request, res: Response) {
  try {
    const campaignId = parseInt(req.params["id"]);
    const influencers = await InfluencerService.getInfluencersByCampaign(
      campaignId
    );
    return res.status(200).json(influencers);
  } catch (error) {
    res.status(401).json("Cannot find campaign id");
  }
}

async function updateInfluencerDetails(req: Request, res: Response) {
  try {
    const updateDetails: Influencer = req.body;
    const updatedInfluencer = await InfluencerService.updateInfluencerDetails(
      updateDetails
    );
    return res.status(200).json(updatedInfluencer);
  } catch (error) {
    res.status(500).json("Could not update influencer.");
  }
}

async function createInfluencer(req: Request, res: Response) {
  try {
    const newInfluencer: ICreateInfluencer = req.body;
    const createdInfluencer = await InfluencerService.createInfluencer(
      newInfluencer
    );
    return res.status(200).json(createdInfluencer);
  } catch (error) {
    res.status(500).json("Could not create influencer.");
  }
}

async function deleteInfluencerById(req: Request, res: Response) {
  const { influencerId: influencerId } = req.body;
  const deletedInfluencer = await InfluencerService.deleteInfluencerById(
    influencerId
  );
  if (!deletedInfluencer) {
    return res.status(500).json("Cannot delete id");
  }
  return res.status(200).json(deletedInfluencer);
}

const InfluencerController = {
  getAllInfluencers,
  getInfluencerById,
  getInfluencersByCampaign,
  createInfluencer,
  updateInfluencerDetails,
  deleteInfluencerById,
};

export { InfluencerController };
