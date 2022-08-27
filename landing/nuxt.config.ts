import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        "@/assets/styles/main.scss",
        "@/assets/fonts/Bakh/fa/bakh-fa.scss",
        "@/assets/fonts/Bakh/en/bakh-en.scss"
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/styles/_variables.scss";',
                },
            },
        },
    },
})
