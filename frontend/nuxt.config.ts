// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  imports: {
    autoImport: true
  },
  runtimeConfig: {
    apiBase: 'http://localhost:5000',

    public: {
      apiBase: 'http://localhost:5000',
    }
  }
})
