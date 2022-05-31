import { defineNuxtPlugin } from '#app'
import { createI18n } from 'vue-i18n'
import jaJP from '~/locales/ja.json'
import enUS from '~/locales/en.json'

export default defineNuxtPlugin((nuxtApp) => {
    // const i18n = createI18n({
    //     locale: 'ja-JP',
    //     messages: {
    //         'ja-JP': jaJP,
    //         'en-US': enUS,
    //     },
    // })
    // nuxtApp.vueApp.use(i18n)
})