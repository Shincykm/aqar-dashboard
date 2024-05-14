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

// ----------------------------------------------------------------------

export type IPropertyTypeTableFilterValue = string | string[] | number | number[];
export type IPropertyTypeTableFilters = {
  name_en: string;
};


