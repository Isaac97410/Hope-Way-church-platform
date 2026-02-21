import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchChurchData, updateChurchData } from '@/lib/api';
import {
  SERMONS,
  EVENTS_CALENDAR,
  MINISTRIES,
  LEADERSHIP,
  CHURCH_INFO,
  SERVICE_TIMES,
  GIVING_INFO
} from '@/lib/data';
// Common query config for static church content
const QUERY_CONFIG = {
  staleTime: 1000 * 60 * 60, // 1 hour
  gcTime: 1000 * 60 * 60 * 24, // 24 hours
  retry: 1, // Minimal retry for production reliability
};
export function useSermons() {
  return useQuery({
    queryKey: ['sermons'],
    queryFn: () => fetchChurchData<any[]>('sermons'),
    initialData: SERMONS,
    ...QUERY_CONFIG,
  });
}
export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => fetchChurchData<any[]>('events'),
    initialData: EVENTS_CALENDAR,
    ...QUERY_CONFIG,
  });
}
export function useMinistries() {
  return useQuery({
    queryKey: ['ministries'],
    queryFn: () => fetchChurchData<any[]>('ministries'),
    initialData: MINISTRIES,
    ...QUERY_CONFIG,
  });
}
export function useLeadership() {
  return useQuery({
    queryKey: ['leadership'],
    queryFn: () => fetchChurchData<any[]>('leadership'),
    initialData: LEADERSHIP,
    ...QUERY_CONFIG,
  });
}
export function useChurchInfo() {
  return useQuery({
    queryKey: ['churchInfo'],
    queryFn: () => fetchChurchData<any>('churchInfo'),
    initialData: CHURCH_INFO,
    ...QUERY_CONFIG,
  });
}
export function useServiceTimes() {
  return useQuery({
    queryKey: ['serviceTimes'],
    queryFn: () => fetchChurchData<any[]>('serviceTimes'),
    initialData: SERVICE_TIMES,
    ...QUERY_CONFIG,
  });
}
export function useGivingInfo() {
  return useQuery({
    queryKey: ['givingInfo'],
    queryFn: () => fetchChurchData<any>('givingInfo'),
    initialData: GIVING_INFO,
    ...QUERY_CONFIG,
  });
}
export function useUpdateChurchData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, data, token }: { type: string; data: any; token: string }) =>
      updateChurchData(type, data, token),
    onSuccess: (_, variables) => {
      // Use the exact type provided in variables to invalidate the correct cache key
      queryClient.invalidateQueries({ queryKey: [variables.type] });
      // If we update brand basics, it might affect multiple spots
      if (variables.type === 'churchInfo') {
        queryClient.invalidateQueries({ queryKey: ['churchInfo'] });
      }
    },
  });
}