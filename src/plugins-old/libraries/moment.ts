import { defineNuxtPlugin } from '#app'
import moment from "moment";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('moment', moment);
})

declare module '#app' {
  interface NuxtApp {
    $moment: Object
  }
}
// span(v-html="$moment({someDate}).format('')") で利用可能
