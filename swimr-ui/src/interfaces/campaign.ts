import { Client, IClientCampaign } from "./client";
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
  client: Client;
}

export interface ICampaignTile {
  campaign: ICampaign;
  tileType: string;
  index?: number;
  listLength?: number;
}
export interface Campaign {
  id: number;
  campaign_name: string;
  campaign_start_date: string | null;
  end_date: Date | null;
}

export interface IUpdateCampaign {
  campaignId: number;
  campaignName: string;
  startDate: Date | null;
  endDate: Date | null;
  companyName?: string;
  influencers?: any[];
  clientId: number;
}

export interface ICampaignModal {
  handleClose: () => void;
  selectedCampaign?: ICampaign | undefined;
  modalType: string;
}
