import { app } from '@storybook/vue3'
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#000d6d',
          background: '#fff',
          error: '#d63031',
          info: '#0984e3',
          secondary: '#EDF2F7',
          success: '#00cec9',
          surface: '#fff',
          warning: '#2d3436',
        },
        dark: false,
        variables: {},
      },
    },
  },
})
app.use(vuetify)

// // i18n
// import { createI18n } from 'vue-i18n'
// import jaJP from '@/locales/ja.json'
// import enUS from '@/locales/en.json'
// const i18n = createI18n({
//   locale: 'ja-JP',
//   messages: {
//     'ja-JP': jaJP,
//     'en-US': enUS,
//   },
// })
// app.use(i18n)

import '@/assets/sass/app.scss'

// Components
const pageContext = import.meta.globEager('../src/components/**/*.vue')
Object.keys(pageContext).forEach((key) => {
  const paths = key
    .split('/')
    .filter((path) => path !== '..' && path !== 'src' && path !== 'components')
  const name = paths.pop().split('.')[0]
  return app.component([...paths, name].join(''), pageContext[key].default)
})

export const decorators = [
  (story) => ({
    components: { story },
    template: '<v-app><story /></v-app>',
  }),
]
