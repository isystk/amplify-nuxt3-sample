import { inject, reactive, InjectionKey, provide } from 'vue'
import MainService from '@/services/main'

const rootStore = () => {
  const state = reactive<{ main: MainService | null }>({
    main: new MainService(),
  })
  return {
    get main() {
      return state.main
    },
  }
}

type RootStore = ReturnType<typeof rootStore>
const RootStoreKey: InjectionKey<RootStore> = Symbol('rootStore')

export const provideStore = () => {
  provide(RootStoreKey, rootStore())
}

export const injectStore = () => {
  const rootStore = inject(RootStoreKey)
  return rootStore?.main
}
