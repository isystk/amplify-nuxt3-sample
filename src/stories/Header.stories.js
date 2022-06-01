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
      main.auth.user = {}
      main.auth.userName = 'sample'
      main.auth.userId = '1234'
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
