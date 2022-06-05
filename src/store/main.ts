import { reactive } from 'vue'
import { defineStore } from 'pinia'
import MainService from '@/services/main'

export const useMainStore = defineStore('posts', () => {
  const store = reactive<{ main: MainService | null }>({
    main: null,
  })

  // method
  const getMain = () => {
    if (store.main === null) {
      const setMain = (_main: MainService) => {
        store.main = _main
      }
      store.main = new MainService(setMain)
    }
    return store.main
  }

  return {
    getMain,
  }
})
