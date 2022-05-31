import { mount } from '@vue/test-utils'
import Logo from '@/components/Pages/Logo.vue'

test('Logo', () => {
  const wrapper = mount(Logo, {
    global: {
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})