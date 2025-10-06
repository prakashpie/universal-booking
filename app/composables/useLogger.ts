import { v4 as uuidv4 } from 'uuid'

export const useLogger = () => {
  const requestId = uuidv4()

  const log = (level: string, event: string, data: any) => {
    console.log(JSON.stringify({ level, event, requestId, ...data }))
  }

  const logBookingAttempt = (payload: any) => {
    log('info', 'booking_attempt', { payloadSummary: { vertical: payload.vertical, selection: payload.selection } })
  }

  const logBookingSuccess = (booking: any) => {
    log('info', 'booking_success', { bookingId: booking.bookingId })
  }

  const logApiError = (error: any) => {
    log('error', 'api_error', { error })
  }

  return { logBookingAttempt, logBookingSuccess, logApiError, requestId }
}
