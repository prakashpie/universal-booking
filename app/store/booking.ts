import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    service: null,
    provider: null,
    date: null,
    session: null,
    item: null,
  }),
  actions: {
    selectService(service: any) {
      this.service = service
    },
    selectProvider(provider: any) {
      this.provider = provider
    },
    selectDate(date: any) {
      this.date = date
    },
    selectSession(session: any) {
      this.session = session
    },
    selectItem(item: any) {
      this.item = item
    },
  },
})
