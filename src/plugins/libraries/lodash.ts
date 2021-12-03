import { defineNuxtPlugin } from '#app'
import * as _ from "lodash";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      _: _
    }
  }
})
// span(v-html="$moment({someDate}).format('')") で利用可能
