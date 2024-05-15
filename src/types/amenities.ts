
export type IAmenityItem = {
  id: number | any;
  name_en: string;
  name_ar: string | null;
  icon :any | null;
  icon_picture : any |null;
} ;

// export type IAmenityItemRow = {
//   id: number | any;
//   name_en: string;
//   name_ar: string | null;
//   icon :any | null;
//   icon_picture : any |null;
// } ;

// ----------------------------------------------------------------------

export type IAmenityTableFilterValue = string | string[] | number | number[];
export type IAmenityTableFilters = {
  name_en: string;
};


