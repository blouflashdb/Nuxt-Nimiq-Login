import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    sessionPassword: '80d42cfb-1cd2-462c-8f17-e3237d9027e9', // change this
    public: {
      nimiqHubUrl: 'https://hub.nimiq.com/',
    },
  },

  modules: ['@nuxt/eslint', 'nuxt-auth-utils'],

  vite: {
    plugins: [
      wasm(),
      topLevelAwait(),
    ],
    optimizeDeps: {
      exclude: ['@nimiq/core'],
    },
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  compatibilityDate: '2024-12-05',
})