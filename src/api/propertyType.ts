import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { endpoints, fetcher1, performRequest } from 'src/utils/axios';
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

export function useGetPropertyType(propertyTypeId: string | number) {
  // const URL = propertyTypeId ? [endpoints.propertyType.details, { params: { propertyTypeId } }] : null;
  const URL = propertyTypeId ? `${endpoints.propertyType.details}/${propertyTypeId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      propertyType: data?.data as IPropertyTypeItem,
      propertyTypeLoading: isLoading,
      propertyTypeError: error,
      propertyTypeValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function useCreateUpdatePropertyType(propertyTypeData : any){
  const URL = endpoints.propertyType.createUpdate;

  const response = await performRequest('POST', URL ,{data : propertyTypeData});
  return response;
}

// ----------------------------------------------------------------------

export async function useDeletePropertyType(propertyTypeId : number){
  const URL = endpoints.propertyType.delete;

  const response = await performRequest<any>('DELETE',`${URL}/${propertyTypeId}`);
  return response;
}