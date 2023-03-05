import { IClientCampaign } from "./clients";
import { Influencer } from "./influencers";

interface Campaign {
  id: number;
  client_id: number;
  campaign_name: string;
  campaign_start_date: Date | null;
  end_date: Date | null;
}

interface CampaignInfluencer {
  id: number;
  influencer_id: number;
  campaign_id: number;
  influencer: Influencer;
}

interface ICampaign {
  campaignId: number;
  campaignName: string;
  startDate: Date | null;
  endDate: Date | null;
  companyName?: string;
  influencers?: CampaignInfluencer[];
  clientId: number;
}

interface ICreateCampaign {
  campaign_name: string;
  campaign_start_date: Date | null;
  end_date: Date | null;
  client_id: number;
}

export { Campaign, ICampaign, ICreateCampaign };
