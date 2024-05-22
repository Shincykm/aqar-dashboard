import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints, performRequest, fetcher1 } from 'src/utils/axios';

// ----------------------------------------------------------------------

// export function useGetProperties() {
//   const URL = endpoints.property.list;

//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

//   const memoizedValue = useMemo(
//     () => ({
//       property: (data?.property as IPropertyItem[]) || [],
//       propertyLoading: isLoading,
//       propertyError: error,
//       propertyValidating: isValidating,
//       propertyEmpty: !isLoading && !data?.property.length,
//     }),
//     [data?.property, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

// ----------------------------------------------------------------------

// export function useGetProperty(propertyId: string) {
//   const URL = propertyId ? `${endpoints.property.details}/${propertyId}` : null;

//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

//   const memoizedValue = useMemo(
//     () => ({
//       property: (data?.data as IPropertyItem[]) || [],
//       propertyLoading: isLoading,
//       propertyError: error,
//       propertyValidating: isValidating,
//       propertyEmpty: !isLoading && !data?.data?.length,
//     }),
//     [data?.property, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

// ----------------------------------------------------------------------

export async function useCreateUpdatePropertyPictureMapping(amenityData: any) {
  const URL = endpoints.propertyPictureMapping.createUpdate;

  console.log(amenityData.get('amenity_picture'));
  
  try {
    const response = await performRequest<any>('post', URL, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: amenityData,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
