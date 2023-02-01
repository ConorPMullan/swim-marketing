interface Campaign {
  id: number;
  campaign_name: string;
  campaign_start_date: Date;
  end_date: Date;
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
}

export { Campaign, ICampaign, ICreateCampaign };
