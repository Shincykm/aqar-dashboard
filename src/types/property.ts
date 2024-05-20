// ----------------------------------------------------------------------


export type IPropertyItem = {
  name_ar?: string | null;
  name_en: string;
  description_ar?: string | null;
  description_en?: string | null;
  active: boolean;
  is_featured: boolean;
  is_furnished: boolean;
  count_bathrooms?: number | null;
  count_bedrooms?: number | null;
  count_parking?: number | null;
  maintenance_fee?: number | null;
  old_amount?: number | null;
  amount?: number | null;
  size_sqm?: number | null;
  // sizeSqft?: number | null;
  ownership?: string | null;
  sub_type?: string | null;
  reference_number?: string | null;
  constructed_date?: Date | null;
  address_id?: number | null;
  building_id?: number | null;
  property_type_id?: number | null;
  property_purpose_id?: number | null;
  property_style_id?: number | null;
  country_id?: number | null;
  city_id?: number | null;
  state_province_id?: number | null;
  display_order?: number | null;
  images: [],
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
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
