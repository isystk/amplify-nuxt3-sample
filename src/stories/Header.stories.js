import { storiesOf } from '@storybook/vue3'
import vueRouter from 'storybook-vue3-router'
import Header from '@/components/Pages/Header.vue'
import MainService from '@/services/main'

storiesOf('pages/Header', module)
  .addDecorator(vueRouter())
  .add('LoggedIn', () => ({
    components: { Header },
    setup: () => {
      const main = new MainService()
      main.auth.id = 1111
      main.auth.name = 'sample'
      main.auth.token = 'abcd'
      return { main }
    },
    template: `<Header :store="main" />`,
  }))
  .add('LoggedOut', () => ({
    components: { Header },
    setup: () => {
      const main = new MainService()
      return { main }
    },
    template: `<Header :store="main" />`,
  }))
