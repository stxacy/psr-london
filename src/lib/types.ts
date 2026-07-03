export type SellerType = 'private' | 'dealer';

export type VehicleSpec = {
  label: string;
  value: string;
  id?: string;
};

export type Vehicle = {
  id: number | string;
  slug: string;
  title: string;
  status: 'draft' | 'live' | 'sold';
  featured: boolean;
  make: string;
  model: string;
  year: number;
  variant?: string;
  mileage: number;
  price: number;
  colour?: string;
  bodyType: string;
  sellerType: SellerType;
  transmission?: string;
  fuelType?: string;
  engineSize?: string;
  power?: string;
  location?: string;
  sellerName?: string;
  description?: string;
  specs?: VehicleSpec[];
  createdAt?: string;
  updatedAt?: string;
};
