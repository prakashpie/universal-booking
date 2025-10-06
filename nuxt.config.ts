// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import {fileURLToPath} from 'url'
import {dirname, join} from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: [
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxt/scripts',
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        '@pinia/nuxt'
    ],
    css: [join(currentDir, './app/assets/css/tailwind.css')],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    shadcn: {
        prefix: 'Meow',
        componentDir: join(currentDir, './components/ui')
    },
    routeRules: {
        '/api/**': {
            proxy: 'http://localhost:5050/api/**'
        }
    },
    customElements: {
        entries: [{
            name: 'booking-widget',
            path: '@/components/BookingFlow.vue',
            options: {
                shadowRoot: true,
            },
        },
        ],
    },
})