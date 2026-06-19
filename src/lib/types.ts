export type SellerType = 'private' | 'dealer';

export type Vehicle = {
  id: string;
  slug: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  mileage: number;
  price: number;
  color: string;
  bodyType: string;
  transmission: string;
  fuelType: string;
  engineSize: string;
  power: string;
  sellerType: SellerType;
  sellerName: string;
  location: string;
  featured: boolean;
  description: string;
  specs: Record<string, string>;
  gradient: string;
};
