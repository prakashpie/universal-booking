import { useLogger } from './useLogger'

export const useSessions = () => {
  const { requestId } = useLogger()

  const fetchSessions = async (classId: string, start: string, end: string) => {
    return useFetch('/api/sessions', {
        params: {
            classId,
            start,
            end,
        },
        headers: {
            'x-request-id': requestId,
        },
    });
  }

  return { fetchSessions }
}
