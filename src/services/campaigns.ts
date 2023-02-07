import { prisma } from "../utils";
import { ICampaign, ICreateCampaign, Campaign } from "../interfaces";

async function getAllCampaigns() {
  let allCampaigns;
  try {
    allCampaigns = await prisma.campaign.findMany();
  } catch (error) {
    throw new Error(error);
  }
  const campaigns: ICampaign[] =
    allCampaigns?.map(
      (x: {
        id: number;
        campaign_name: string;
        campaign_start_date: Date;
        end_date: Date;
      }) => ({
        campaignId: x.id,
        campaignName: x.campaign_name,
        startDate: x.campaign_start_date,
        endDate: x.end_date,
      })
    ) || [];
  return campaigns;
}

async function getCampaignById(campaignId: number): Promise<ICampaign> {
  let campaignObject;

  try {
    campaignObject = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });
  } catch (error) {
    throw new Error(error);
  }

  const returnedValue = {
    campaignId: campaignObject.id,
    campaignName: campaignObject.campaign_name,
    startDate: campaignObject.campaign_start_date,
    endDate: campaignObject.end_date,
  };
  return returnedValue;
}

async function getCampaignsByInfluencer(
  influencerId: number
): Promise<ICampaign[]> {
  let campaigns;

  try {
    campaigns = await prisma.campaign_influencer.findMany({
      where: { influencer_id: influencerId },
      include: { campaign: true },
    });
  } catch (error) {
    throw new Error(error);
  }

  const campaignResults: ICampaign[] =
    campaigns?.map(
      (x: {
        id: number;
        campaign: {
          id: number;
          campaign_name: string;
          campaign_start_date: Date;
          end_date: Date;
        };
      }) => ({
        campaignId: x.campaign.id,
        campaignName: x.campaign.campaign_name,
        startDate: x.campaign.campaign_start_date,
        endDate: x.campaign.end_date,
      })
    ) || [];

  return campaignResults;
}

//UPDATE functions

async function updateCampaignDetails(campaign: Campaign) {
  let updateCampaign;
  try {
    updateCampaign = await prisma.campaign.update({
      where: {
        id: campaign.id,
      },
      data: {
        campaign_name: campaign.campaign_name,
        campaign_start_date: campaign.campaign_start_date,
        end_date: campaign.end_date,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
  return updateCampaign;
}

//CREATE function

async function createCampaign(campaign: ICreateCampaign): Promise<Campaign> {
  try {
    const newCampaign = await prisma.campaign.create({
      data: {
        campaign_name: campaign.campaign_name,
        campaign_start_date: campaign.campaign_start_date,
        end_date: campaign.end_date,
      },
    });

    const createdCampaign = {
      id: newCampaign.id,
      campaign_name: newCampaign.campaign_name,
      campaign_start_date: newCampaign.campaign_start_date,
      end_date: newCampaign.end_date,
    };

    await prisma.client_campaign.create({
      data: {
        client_id: campaign.client_id,
        campaign_id: newCampaign.id,
      },
    });
    return createdCampaign;
  } catch (error) {
    throw Error("Cannot create campaign", error);
  }
}

async function deleteCampaignById(campaignId: number) {
  let deletedCampaign;
  try {
    deletedCampaign = await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        campaign_name: "DELETEDCAMPAIGN",
        campaign_start_date: new Date(0, 0, 0, 0, 0, 0, 0),
        end_date: new Date(0, 0, 0, 0, 0, 0, 0),
      },
    });
  } catch (error) {
    throw new Error("Could not delete campaign", error);
  }
  return deletedCampaign;
}

const CampaignService = {
  getAllCampaigns,
  getCampaignById,
  getCampaignsByInfluencer,
  createCampaign,
  updateCampaignDetails,
  deleteCampaignById,
};

export { CampaignService };
