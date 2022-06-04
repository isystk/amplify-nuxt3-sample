import { storiesOf } from '@storybook/vue3'
import Logo from '@/components/Pages/Logo.vue'

storiesOf('pages/Logo', module).add('Basic', () => ({
  components: { Logo },
  template: `<Logo />`,
}))
