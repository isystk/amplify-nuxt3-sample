import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSideMenu = defineStore('sideMenu', () => {
  const isOpen = ref<boolean>(false)

  // method
  const toggle = () => (isOpen.value = !isOpen.value)
  const close = () => (isOpen.value = false)

  return {
    isOpen,
    toggle,
    close,
  }
})
