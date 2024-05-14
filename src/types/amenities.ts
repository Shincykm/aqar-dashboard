
export type IAmenityItem = {
  id: number | any;
  name_en: string;
  name_ar: string | null;
  icon :any
} ;

// ----------------------------------------------------------------------

export type IAmenityTableFilterValue = string | string[] | number | number[];
export type IAmenityTableFilters = {
  name_en: string;
};


