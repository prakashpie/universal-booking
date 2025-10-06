import { useConfigStore } from '@/store/config'

export const useConfig = () => {
  return useConfigStore()
}
