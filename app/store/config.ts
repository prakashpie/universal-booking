import { defineStore } from 'pinia'
import type { AppConfig } from '@/types'
export const useConfigStore = defineStore('config', {
  state: () => ({
    config: null as AppConfig | null,
  }),
  actions: {
    async fetchConfig(vertical: string) {
      const { data } = await useFetch(`/api/config?vertical=${vertical}`)
      this.config = data.value
    },
  },
})
