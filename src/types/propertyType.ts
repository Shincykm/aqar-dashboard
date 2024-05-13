export type IPropertyType = {
  id: number;
  nameEn: string;
  nameAr: string | null;
};

export type IPropertyTypeItem = {
  id: number;
  name_en: string;
  name_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  parent_id?: number | null;
} | null;
