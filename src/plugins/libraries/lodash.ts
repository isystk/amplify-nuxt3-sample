import { defineNuxtPlugin } from '#app'
import lodash from 'lodash'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide('lodash', lodash)
})

declare module '#app' {
  interface NuxtApp {
    $_: ReturnType<lodash>
  }
}
