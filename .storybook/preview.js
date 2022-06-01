import { app } from '@storybook/vue3'
// import vuetify from '@/plugins/vuetify'
// import i18n from '@/plugins/i18n'
// app.use(vuetify)
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
