// ----------------------------------------------------------------------

export type IPropertyFilterValue = string | string[] | Date | IAgent | null;

export type IPropertyFilters = {
  name_ar : string,
  agent: IAgent[];
  location: string[];
  amenities: string[];
  constructedDate: Date | null;
};

// ----------------------------------------------------------------------

export type IAgent = {
  id: string;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
};

export type IPropertyItem = {
  id?: any;
  name_en: string | any ;
  name_ar?: string | null;
  description_ar?: string | null;
  description_en?: string | null;
  active: boolean | string;
  is_featured: boolean | string;
  is_furnished: boolean | string;
  count_bathrooms?: number | null;
  count_bedrooms?: number | null;
  count_parking?: number | null;
  maintenance_fee?: number | null;
  old_amount?: number | null;
  amount?: number | null;
  size_sqm?: number | null;
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
  pictures: [] | any;
  amenity_items?: [];
};



export type IPropertyTableFilterValue = string | string[];

export type IPropertyTableFilters = {
  name_en: string;
  name_ar: string;
};
