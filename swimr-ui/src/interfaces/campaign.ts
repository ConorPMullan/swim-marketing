export interface ICampaign {
  campaignId: number;
  campaignName: string;
  endDate: string;
  startDate: string;
  companyName?: string;
}
export interface Campaign {
  id: number;
  campaign_name: string;
  campaign_start_date: string | null;
  end_date: Date | null;
}
