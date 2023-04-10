interface Influencer {
  id: number;
  influencer_name: string;
  email: string;
  price_per_post: string;
  is_active: boolean;
}

interface IPlatform {
  platform_name: string;
  id: number;
}

interface IInfluencer {
  id: number;
  influencerName: string;
  email: string;
  pricePerPost: string;
  isActive: boolean;
  platform?: IPlatform;
}

interface ICreateInfluencer {
  influencer_name: string;
  email: string;
  price_per_post: string;
  is_active: boolean;
  platform_id: number;
}

export { Influencer, IInfluencer, ICreateInfluencer };
