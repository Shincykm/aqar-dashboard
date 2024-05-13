export type IPropertyType = {
  id: number;
  nameEn: string;
  nameAr: string | null;
};

export type IPropertyTypeItem = {
  id: number | any;
  name_en: string;
  name_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  parent_id?: number | null;
} ;


// //////////////////////////////////////////////////////////////////////

export type IPropertyFilterValue = string | string[] | number | number[];

export type IPropertyFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};


// ----------------------------------------------------------------------

// export type IPropertyTypeTableFilterValue = string | string[];
export type IPropertyTypeTableFilterValue = string | string[];
export type IPropertyTypeTableFilters = {
  name_en: string;
};

// //////////////////////////////////////////////////////////////////////
export type IPropertyTypeFilterValue = string | string[] | number | number[];

export type IPropertyTypeFilters = {
  // rating: string;
  // gender: string[];
  // category: string;
  // colors: string[];
  // priceRange: number[];
  name_en:string;
};

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

