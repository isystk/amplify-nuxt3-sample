import { computed, inject, InjectionKey, provide } from 'vue'
import { useMainStore } from '@/store/main'

const rootStore = () => {
  const store = useMainStore()
  const main = computed(() => store.getMain())
  return {
    get main() {
      return main.value
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
