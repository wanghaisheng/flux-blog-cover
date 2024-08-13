// plugins/antd.client.ts

import Antd from "ant-design-vue";
import { createI18n } from 'vue-i18n'
import en from '../components/language/en.js'
import zh from '../components/language/zh.js'
import '../assets/index.less'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    zh
  }
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Antd).use(i18n)
})
