import { computed, inject, InjectionKey, provide } from 'vue'
import { useMainStore } from '@/store/main'

const rootStore = () => {
  const store = useMainStore()
  return {
    get main() {
      return store.getMain()
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
