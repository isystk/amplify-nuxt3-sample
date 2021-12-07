import { defineNuxtPlugin } from '#app'
import sanitizeHTML from "sanitize-html";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.provide('sanitize', sanitizeHTML);
})

declare module '#app' {
  interface NuxtApp {
    $sanitize: Object
  }
}
// span(v-html="$sanitize({someContent})") で利用可能
