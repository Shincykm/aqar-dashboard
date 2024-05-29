import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints, performRequest, fetcher1 } from 'src/utils/axios';
// types
import { IPropertyItem } from 'src/types/property';
// ----------------------------------------------------------------------

export function useGetProperties() {
  const URL = endpoints.property.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      property: (data?.data as IPropertyItem[]) || [],
      propertyLoading: isLoading,
      propertyError: error,
      propertyValidating: isValidating,
      propertyEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.property, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProperty(propertyId: string) {
  const URL = propertyId ? `${endpoints.property.details}/${propertyId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      property: (data?.data as IPropertyItem[]) || [],
      propertyLoading: isLoading,
      propertyError: error,
      propertyValidating: isValidating,
      propertyEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.property, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function useCreateUpdateProperty(data: any) {
  const URL = endpoints.property.createUpdate;
  console.log(data);
  
  const formData = new FormData();

  const { amenity_items, ...propertyData } = data;

  // Hnadling formData
  Object.entries(data).forEach(([key, value]) => {
    if (value === true || value === false) {
      formData.append(key, value ? '1' : '0');
    } else if (typeof value === 'string' && value !== '') {
      formData.append(key, value);
    } else if (typeof value === 'number' && value !== 0) {
      formData.append(key, value.toString());
    } else if (key === 'pictures' && Array.isArray(value)) {
      value.forEach((file, index) => {
        formData.append(`pictures[${index}]`, file);
      });
    } else {
      formData.append(key, '');
    }
  });

  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  try {
    const response = await performRequest<any>('post', URL, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
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
