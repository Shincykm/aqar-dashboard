import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { endpoints, fetcher1, performRequest } from 'src/utils/axios';
import { handleFormData } from 'src/utils/create-formData';

// ----------------------------------------------------------------------

export function useGetAgentList(page = 1, limit = 10, search = '') {
  const URL = `${endpoints.agents.list}?page=${page}&limit=${limit}&search=${search}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      agents: (data?.data as any[]) || [],
      agentsLoading: isLoading,
      agentsError: error,
      agentsValidating: isValidating,
      agentsEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetAgent(agentId: string | number) {
  const URL = agentId ? `${endpoints.agents.details}/${agentId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      agent: data?.data as any,
      agentLoading: isLoading,
      agentError: error,
      agentValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function useCreateUpdateAgents(agentData: any) {
    const URL = endpoints.agents.createUpdate;
    console.log(agentData, "===agentDaa");
    

    // Hnadling formData
    const formData = handleFormData(agentData);

    try {
        const response = await performRequest<any>('post', URL, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------

export async function useDeleteAgents(agentId: number) {
    const URL = endpoints.agents.delete;

    try {
      const response = await performRequest<any>('DELETE', `${URL}/${agentId}`);
      return response?.data;
    } catch (error) {
      throw error;
    }
}

// ----------------------------------------------------------------------

export function useGetLanguages(page = 1, limit = 10) {
  const URL = `${endpoints.agents.languages}?page=${page}&limit=${limit}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      languages: data?.data as any,
      languagesLoading: isLoading,
      languagesError: error,
      languagesValidating: isValidating,
      languagesEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}