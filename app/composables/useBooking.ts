import { useLogger } from './useLogger'

export const useBooking = () => {
  const { logBookingAttempt, logBookingSuccess, logApiError, requestId } = useLogger()

  const book = async (payload: any) => {
    logBookingAttempt(payload)
    const { data, error } = await useFetch('/api/book', {
      method: 'POST',
      body: payload,
      headers: {
        'x-request-id': requestId,
      },
    })

    if (error.value) {
      logApiError(error.value)
    } else if (data.value) {
      logBookingSuccess(data.value)
    }

    return { data, error }
  }

  return { book }
}
