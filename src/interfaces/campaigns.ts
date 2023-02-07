interface Campaign {
  id: number;
  campaign_name: string;
  campaign_start_date: Date | null;
  end_date: Date | null;
}

interface ICampaign {
  campaignId: number;
  campaignName: string;
  startDate: Date;
  endDate: Date;
}

interface ICreateCampaign {
  campaign_name: string;
  campaign_start_date: Date;
  end_date: Date;
  client_id: number;
}

export { Campaign, ICampaign, ICreateCampaign };
