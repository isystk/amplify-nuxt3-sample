import { defineNuxtPlugin } from '#app'
import sanitizeHTML from "sanitize-html";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.provide('sanitize', sanitizeHTML);
})

declare module '#app' {
  interface NuxtApp {
    $sanitize: ReturnType<sanitizeHTML>
  }
}
// span(v-html="$sanitize({someContent})") で利用可能
