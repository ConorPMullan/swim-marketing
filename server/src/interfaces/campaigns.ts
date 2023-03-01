interface Campaign {
  id: number;
  campaign_name: string;
  campaign_start_date: Date | null;
  end_date: Date | null;
}

interface ICampaign {
  campaignId: number;
  campaignName: string;
  startDate: Date | null;
  endDate: Date | null;
  companyName?: string;
}

interface ICreateCampaign {
  campaign_name: string;
  campaign_start_date: Date | null;
  end_date: Date | null;
  client_id: number;
}

export { Campaign, ICampaign, ICreateCampaign };
