import { defineNuxtPlugin } from '#app'
import moment from "moment";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      moment: moment
    }
  }
})
// span(v-html="$moment({someDate}).format('')") で利用可能
