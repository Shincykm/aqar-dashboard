export type IPropertyItem = {
  nameAr?: string | null;
  nameEn: string;
  descriptionAr?: string | null;
  descriptionEn?: string | null;
  active: boolean;
  isFeatured: boolean;
  isFurnished: boolean;
  countBathrooms?: number | null;
  countBedrooms?: number | null;
  countParking?: number | null;
  maintenanceFee?: number | null;
  oldAmount?: number | null;
  amount?: number | null;
  sizeSqm?: number | null;
  sizeSqft?: number | null;
  ownership?: string | null;
  subType?: string | null;
  referenceNumber?: string | null;
  constructedDate?: Date | null;
  addressId?: number | null;
  buildingId?: number | null;
  propertyTypeId?: number | null;
  propertyPurposeId?: number | null;
  propertyStyleId?: number | null;
  countryId?: number | null;
  cityId?: number | null;
  stateProvinceId?: number | null;
  displayOrder?: number | null;
  images: [],
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export type IPropertyTableFilterValue = string | string[];

export type IPropertTableFilters = {
  name: string;
};

// //////////////////// Original Product code ///////////////////////////

// ----------------------------------------------------------------------

export type IProductFilterValue = string | string[] | number | number[];

export type IProductFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};

// ----------------------------------------------------------------------

export type IProductReviewNewForm = {
  rating: number | null;
  review: string;
  name: string;
  email: string;
};

export type IProductReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  isPurchased: boolean;
  attachments?: string[];
  postedAt: Date;
};

export type IProductItem = {
  id: string;
  sku: string;
  name: string;
  code: string;
  price: number;
  taxes: number;
  tags: string[];
  gender: string;
  sizes: string[];
  publish: string;
  coverUrl: string;
  images: string[];
  colors: string[];
  quantity: number;
  category: string;
  available: number;
  totalSold: number;
  description: string;
  totalRatings: number;
  totalReviews: number;
  inventoryType: string;
  subDescription: string;
  priceSale: number | null;
  reviews: IProductReview[];
  createdAt: Date;
  ratings: {
    name: string;
    starCount: number;
    reviewCount: number;
  }[];
  saleLabel: {
    enabled: boolean;
    content: string;
  };
  newLabel: {
    enabled: boolean;
    content: string;
  };
};

export type IProductTableFilterValue = string | string[];

export type IProductTableFilters = {
  name: string;
  stock: string[];
  publish: string[];
};
