// plugins/antd.client.ts

import Antd from "ant-design-vue";
import { createI18n } from 'vue-i18n'
import en from '@/i18n/en.js'
import zh from '@/i18n/zh.js'


const cookies = useCookie("locale")
const lang = cookies.value || 'en'
cookies.value = lang
const i18n = createI18n({
  legacy: false,
  locale: lang,
  messages: {
    en,
    zh
  }
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Antd).use(i18n)
})
