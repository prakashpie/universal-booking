import { useConfig } from '@/composables/useConfig'

export const useTheme = () => {
  const configStore = useConfig()

  const applyTheme = () => {
    const theme = configStore.config?.branding?.theme

    if (theme) {
      const root = document.documentElement
      root.style.setProperty('--primary', theme.primary)
      root.style.setProperty('--background', theme.background)
      root.style.setProperty('--foreground', theme.text)
    }
  }

  return { applyTheme }
}
