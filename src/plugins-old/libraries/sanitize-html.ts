import { defineNuxtPlugin } from '#app'
import sanitizeHTML from "sanitize-html";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      sanitize: sanitizeHTML
    }
  }
})
// span(v-html="$sanitize({someContent})") で利用可能
