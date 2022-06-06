import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import MainService from '@/services/main'

export const useMainStore = defineStore('main', () => {
  const store = reactive<{ main: MainService | null }>({
    main: null,
  })

  // method
  const getMain = () => {
    if (store.main === null) {
      store.main = new MainService()
    }
    return store.main
  }

  return {
    getMain,
  }
})
