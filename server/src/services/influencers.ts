import { prisma } from "../utils";
import { IInfluencer, ICreateInfluencer, Influencer } from "../interfaces";

async function getAllInfluencers() {
  let allInfluencers;
  try {
    allInfluencers = await prisma.influencer.findMany({
      include: {
        platform: true,
      },
    });
  } catch (error) {
    throw new Error("Cannot get influencers");
  }

  const influencers: IInfluencer[] =
    allInfluencers?.map(
      (x: {
        id: number;
        influencer_name: string;
        email: string;
        price_per_post: string;
        is_active: boolean;
        platform: { id: number; platform_name: string };
      }) => ({
        influencerId: x.id,
        influencerName: x.influencer_name,
        email: x.email,
        pricePerPost: x.price_per_post,
        isActive: x.is_active,
        platform: {
          id: x.platform.id,
          platform_name: x.platform.platform_name,
        },
      })
    ) || [];
  return influencers;
}

async function getInfluencerById(influencerId: number): Promise<IInfluencer> {
  let influencerObject;

  try {
    influencerObject = await prisma.influencer.findUnique({
      where: { id: influencerId },
    });
  } catch (error) {
    throw new Error("Cannot get influencer by id");
  }

  const returnedValue = {
    id: influencerObject.id,
    influencerName: influencerObject.influencer_name,
    email: influencerObject.email,
    pricePerPost: influencerObject.price_per_post,
    isActive: influencerObject.is_active,
  };
  return returnedValue;
}

async function getInfluencersByCampaign(
  campaignId: number
): Promise<IInfluencer[]> {
  let influencers;

  try {
    influencers = await prisma.campaign_influencer.findMany({
      where: { campaign_id: campaignId },
      include: { influencer: true },
    });
  } catch (error) {
    throw new Error("Cannot get influencers by campaign id");
  }

  const influencerResults: IInfluencer[] =
    influencers?.map(
      (x: {
        id: number;
        influencer: {
          id: number;
          influencer_name: string;
          email: string;
          price_per_post: string;
          is_active: boolean;
        };
      }) => ({
        influencerId: x.influencer.id,
        influencerName: x.influencer.influencer_name,
        email: x.influencer.email,
        pricePerPost: x.influencer.price_per_post,
        isActive: x.influencer.is_active,
      })
    ) || [];

  return influencerResults;
}

//UPDATE functions

async function updateInfluencerDetails(influencer: Influencer) {
  let updateInfluencer;
  try {
    updateInfluencer = await prisma.influencer.update({
      where: {
        id: influencer.id,
      },
      data: {
        influencer_name: influencer.influencer_name,
        email: influencer.email,
        price_per_post: influencer.price_per_post,
        is_active: influencer.is_active,
      },
    });
  } catch (error) {
    throw new Error("Cannot update influencer");
  }
  return updateInfluencer;
}

//CREATE function

async function createInfluencer(
  influencer: ICreateInfluencer
): Promise<IInfluencer> {
  try {
    const newInfluencer = await prisma.influencer.create({
      data: {
        influencer_name: influencer.influencer_name,
        email: influencer.email,
        price_per_post: influencer.price_per_post,
        is_active: influencer.is_active,
        platform_id: influencer.platform_id,
      },
    });

    const createdInfluencer = {
      id: newInfluencer.id,
      influencerName: newInfluencer.influencer_name,
      email: newInfluencer.email,
      pricePerPost: newInfluencer.price_per_post,
      isActive: newInfluencer.is_active,
      platformId: newInfluencer.platform_id,
    };
    return createdInfluencer;
  } catch (error) {
    throw Error("Cannot create influencer", error);
  }
}

async function deleteInfluencerById(influencerId: number) {
  let deletedInfluencer;
  try {
    deletedInfluencer = await prisma.influencer.update({
      where: {
        id: influencerId,
      },
      data: {
        influencer_name: "DELETEDINFLUENCER",
        email: "DELETEDINFLUENCER",
        price_per_post: "DELETEDINFLUENCER",
        is_active: false,
        platform_id: 0,
      },
    });
  } catch (error) {
    throw new Error("Cannot delete influencer");
  }
  return deletedInfluencer;
}

const InfluencerService = {
  getAllInfluencers,
  getInfluencerById,
  getInfluencersByCampaign,
  createInfluencer,
  updateInfluencerDetails,
  deleteInfluencerById,
};

export { InfluencerService };
