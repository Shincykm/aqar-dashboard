import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import axiosInstance, { fetcher, endpoints, poster, fetcher1 } from 'src/utils/axios';
// types
import { IPropertyTypeItem } from 'src/types/propertyType';

// ----------------------------------------------------------------------

export function useGetPropertyTypeList(page = 1, limit=10 ) {
  const URL = `${endpoints.propertyType.list}?page=${page}&limit=${limit}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      propertyTypes: (data?.data as IPropertyTypeItem[]) || [],
      propertyTypeLoading: isLoading,
      propertyTypeError: error,
      propertyTypeValidating: isValidating,
      propertyTypeEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function useCreateUpdatePropertyType(propertyTypeData : any){
  const URL = endpoints.propertyType.createUpdate;
  console.log(propertyTypeData, "==propertyTypeData api/propertyType.ts");

  const response = poster([URL, propertyTypeData]);
  return response;
}