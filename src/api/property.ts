import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints, performRequest } from 'src/utils/axios';
// types
import { IPropertyItem } from 'src/types/property';
import axios from 'axios';

// ----------------------------------------------------------------------

export function useGetProperties() {
  const URL = endpoints.property.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      property: (data?.property as IPropertyItem[]) || [],
      propertyLoading: isLoading,
      propertyError: error,
      propertyValidating: isValidating,
      propertyEmpty: !isLoading && !data?.property.length,
    }),
    [data?.property, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProperty(propertyId: string) {
  const URL = endpoints.property.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      property: (data?.property as IPropertyItem[]) || [],
      propertyLoading: isLoading,
      propertyError: error,
      propertyValidating: isValidating,
      propertyEmpty: !isLoading && !data?.property.length,
    }),
    [data?.property, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function useCreateUpdateProperty(propertyData: any) {
  const URL = endpoints.property.createUpdate;

  try {
    // const response = await axios.post('https://aqar.api.mvp-apps.ae/api/admin/property/createUpdateProperty',formData);
    
    const response = await performRequest<any>('post', URL, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: propertyData,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------------------------------------------------------

// export function useSearchProducts(query: string) {
//   const URL = query ? [endpoints.product.search, { params: { query } }] : null;

//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
//     keepPreviousData: true,
//   });

//   const memoizedValue = useMemo(
//     () => ({
//       searchResults: (data?.results as IProductItem[]) || [],
//       searchLoading: isLoading,
//       searchError: error,
//       searchValidating: isValidating,
//       searchEmpty: !isLoading && !data?.results.length,
//     }),
//     [data?.results, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

// ----------------------------------------------------------------------
