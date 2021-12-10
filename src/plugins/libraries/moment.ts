import { defineNuxtPlugin } from '#app'
import moment from "moment";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.provide('moment', moment);
})

declare module '#app' {
  interface NuxtApp {
    $moment: ReturnType<moment>
  }
}
// span(v-html="$moment({someDate}).format('')") で利用可能
