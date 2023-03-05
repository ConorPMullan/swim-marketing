import { prisma } from "../utils";
import { ICampaign, ICreateCampaign, Campaign } from "../interfaces";

async function getAllCampaigns() {
  let allCampaigns;
  try {
    allCampaigns = await prisma.campaign.findMany({
      include: {
        client: true,
        campaign_influencer: {
          include: {
            influencer: true,
          },
        },
      },
    });
    console.log("ALL CAMPAIGNS", allCampaigns);
    allCampaigns.map((camp) => {
      console.log("camp", camp.client);
    });
  } catch (error) {
    throw new Error("Cannot get campaigns");
  }

  const campaigns: ICampaign[] =
    allCampaigns?.map(
      (x: {
        id: number;
        campaign_name: string;
        campaign_start_date: Date;
        end_date: Date;
        client_id: number;
        client: {
          id: number;
          client_name: string;
          email: string;
          company_name: string;
        };

        campaign_influencer: [
          {
            id: number;
            influencer_id: string;
            influencer: {
              id: number;
              influencer_name: string;
              email: string;
              platform_id: 8;
              price_per_post: string;
              is_active: boolean;
            };
          }
        ];
      }) => ({
        campaignId: x.id,
        campaignName: x.campaign_name,
        startDate: x.campaign_start_date,
        endDate: x.end_date,
        companyName: x.client.company_name,
        client: x.client,
        clientId: x.client_id,
        influencers: x.campaign_influencer,
      })
    ) || [];
  console.log("Campaigns", campaigns);
  const filteredCampaigns = campaigns.filter(
    (campaign) => campaign.campaignName !== "DELETEDCAMPAIGN"
  );
  return filteredCampaigns;
}

async function getCampaignById(campaignId: number): Promise<ICampaign> {
  let campaignObject;

  try {
    campaignObject = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: {
        client: true,
      },
    });
  } catch (error) {
    throw new Error("Cannot get campaign by id");
  }

  const returnedValue = {
    campaignId: campaignObject.id,
    campaignName: campaignObject.campaign_name,
    startDate: campaignObject.campaign_start_date,
    endDate: campaignObject.end_date,
    clientId: campaignObject.client_id,
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
    throw new Error("Cannot get campaigns by influencer");
  }

  const campaignResults: ICampaign[] =
    campaigns
      ?.filter((c) => c.campaign_name !== "DELETEDCAMPAIGN")
      .map(
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

async function getCampaignsByClient(clientId: number): Promise<ICampaign[]> {
  let campaigns;

  try {
    campaigns = await prisma.campaign.findMany({
      where: { client_id: clientId },
    });
  } catch (error) {
    throw new Error("Cannot get campaigns by influencer");
  }

  const campaignResults: ICampaign[] =
    campaigns
      ?.filter((c) => c.campaign_name !== "DELETEDCAMPAIGN")
      .map(
        (x: {
          id: number;
          client_id: number;
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

  return campaignResults;
}

//UPDATE functions

async function updateCampaignDetails(campaign: ICampaign) {
  let updateCampaign;
  try {
    updateCampaign = await prisma.campaign.update({
      where: {
        id: campaign.campaignId,
      },
      data: {
        campaign_name: campaign.campaignName,
        campaign_start_date: campaign.startDate,
        end_date: campaign.endDate,
        client_id: campaign.clientId,
      },
    });
  } catch (error) {
    throw new Error("Cannot update campaign");
  }
  return updateCampaign;
}

//CREATE function

async function createCampaign(campaign: ICampaign): Promise<Campaign> {
  try {
    const newCampaign = await prisma.campaign.create({
      data: {
        client_id: campaign.clientId,
        campaign_name: campaign.campaignName,
        campaign_start_date: campaign.startDate,
        end_date: campaign.endDate,
      },
    });
    const createdCampaign = {
      id: newCampaign.id,
      client_id: newCampaign.client_id,
      campaign_name: newCampaign.campaign_name,
      campaign_start_date: newCampaign.campaign_start_date,
      end_date: newCampaign.end_date,
    };
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
    throw new Error("Could not delete campaign");
  }
  return deletedCampaign;
}

const CampaignService = {
  getAllCampaigns,
  getCampaignById,
  getCampaignsByInfluencer,
  getCampaignsByClient,
  createCampaign,
  updateCampaignDetails,
  deleteCampaignById,
};

export { CampaignService };
