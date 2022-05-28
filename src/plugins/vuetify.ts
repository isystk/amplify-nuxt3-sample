import { defineNuxtPlugin } from '#app'
import { createVuetify } from 'vuetify'
import {
    VApp,
    VAppBar,
    VBtn
} from 'vuetify/components'

export default defineNuxtPlugin((nuxtApp) => {
   const vuetify = createVuetify({
       components: {
           VApp,
           VAppBar,
           VBtn
       }
   })
   nuxtApp.vueApp.use(vuetify)
})