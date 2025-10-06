import { useLogger } from './useLogger'

export const useInventory = () => {
  const { requestId } = useLogger()

  const fetchInventory = async (itemId: string, startDate: string, endDate: string) => {
    return useFetch('/api/inventory', {
        params: {
            itemId,
            startDate,
            endDate,
        },
        headers: {
            'x-request-id': requestId,
        },
    });
  }

  return { fetchInventory }
}
