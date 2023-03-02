export interface IPlatform {
  id: number;
  platform_name: string;
}

export interface Influencers {
  id: number;
  influencer_name: string;
  email: string;
  platform_id: number;
  price_per_post: string;
  is_active: boolean;
}

export interface IInfluencers {
  email: string;
  influencerId: number;
  influencerName: string;
  isActive: boolean;
  pricePerPost: string;
  platform: IPlatform;
}
