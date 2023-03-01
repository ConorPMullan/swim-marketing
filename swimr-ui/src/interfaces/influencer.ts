export interface IPlatform {
  id: number;
  platform_name: string;
}

export interface IInfluencers {
  email: string;
  influencerId: number;
  influencerName: string;
  isActive: boolean;
  pricePerPost: string;
  platform: IPlatform;
}
