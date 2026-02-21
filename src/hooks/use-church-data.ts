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
// Custom hooks that fall back to static data if KV is empty
export function useSermons() {
  return useQuery({
    queryKey: ['sermons'],
    queryFn: () => fetchChurchData<any[]>('sermons'),
    initialData: SERMONS,
    retry: false
  });
}
export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => fetchChurchData<any[]>('events'),
    initialData: EVENTS_CALENDAR,
    retry: false
  });
}
export function useMinistries() {
  return useQuery({
    queryKey: ['ministries'],
    queryFn: () => fetchChurchData<any[]>('ministries'),
    initialData: MINISTRIES,
    retry: false
  });
}
export function useLeadership() {
  return useQuery({
    queryKey: ['leadership'],
    queryFn: () => fetchChurchData<any[]>('leadership'),
    initialData: LEADERSHIP,
    retry: false
  });
}
export function useChurchInfo() {
  return useQuery({
    queryKey: ['churchInfo'],
    queryFn: () => fetchChurchData<any>('churchInfo'),
    initialData: CHURCH_INFO,
    retry: false
  });
}
export function useServiceTimes() {
  return useQuery({
    queryKey: ['serviceTimes'],
    queryFn: () => fetchChurchData<any[]>('serviceTimes'),
    initialData: SERVICE_TIMES,
    retry: false
  });
}
export function useGivingInfo() {
  return useQuery({
    queryKey: ['givingInfo'],
    queryFn: () => fetchChurchData<any>('givingInfo'),
    initialData: GIVING_INFO,
    retry: false
  });
}
export function useUpdateChurchData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, data, token }: { type: string; data: any; token: string }) => 
      updateChurchData(type, data, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.type] });
    },
  });
}