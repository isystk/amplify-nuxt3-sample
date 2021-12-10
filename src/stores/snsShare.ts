import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSnsShare = defineStore('snsShare', () => {
  const isOpen = ref<boolean>(false)

  // method
  const toggle = () => (isOpen.value = !isOpen.value)
  const open = () => (isOpen.value = true)
  const close = () => (isOpen.value = false)

  return {
    isOpen,
    toggle,
    open,
    close,
  }
})
