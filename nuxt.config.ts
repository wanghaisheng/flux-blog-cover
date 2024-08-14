// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath, URL } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer:{
    host: '0.0.0.0',
    port: 8303
  },
  alias: {
    //配置别名
    '@': fileURLToPath(new URL('./', import.meta.url)),
    '@components': fileURLToPath(new URL('./components', import.meta.url))
  },
  css: [
    '@/assets/index.less',
  ],
  app: {
    head: {
    }
  },
})
