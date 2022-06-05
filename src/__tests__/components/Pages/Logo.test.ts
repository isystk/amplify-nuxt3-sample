import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import Logo from '@/components/Pages/Logo.vue'

test('Logo', () => {
  const wrapper = mount(Logo, {})
  expect(wrapper.element).toMatchSnapshot()
})
