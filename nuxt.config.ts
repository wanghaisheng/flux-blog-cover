// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath, URL } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      googleClientId: '101427724864-400ueqgg6skkbbtluee7828d7pf5enr8.apps.googleusercontent.com'
        //"169537564056-c7uq0pr86250qi6voriufik2093lqobl.apps.googleusercontent.com",
    },
  },
  imports: {
    dirs: [
      // 扫描顶级模块
      'composables',
      // ... 或扫描带有特定名称和文件扩展名的一级嵌套模块
      'composables/*/index.{ts,js,mjs,mts}',
      // ... 或扫描给定目录中的所有模块
      'composables/**'
    ]
  },
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
