import { useLogger } from './useLogger'

export const useAvailability = () => {
  const { requestId } = useLogger()

  const fetchAvailability = async (serviceId: string, providerId: string, start: string, end: string) => {
    return useFetch('/api/availability', {
        params: {
            serviceId,
            providerId,
            start,
            end,
        },
        headers: {
            'x-request-id': requestId,
        },
    });
  }

  return { fetchAvailability }
}
