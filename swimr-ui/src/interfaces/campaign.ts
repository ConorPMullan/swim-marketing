import { Influencers } from "./influencer";

export interface ICampaignInfluencer {
  id: number;
  influencer_id: number;
  campaign_id: number;
  influencer: Influencers;
}

export interface ICampaign {
  campaignId: number;
  campaignName: string;
  endDate: string;
  startDate: string;
  companyName?: string;
  influencers?: ICampaignInfluencer[];
}
export interface Campaign {
  id: number;
  campaign_name: string;
  campaign_start_date: string | null;
  end_date: Date | null;
}
