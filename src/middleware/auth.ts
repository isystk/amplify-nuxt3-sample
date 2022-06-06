import { defineNuxtRouteMiddleware } from 'nuxt/app'
import { useMainStore } from '@/store/main'
import { Url } from '@/constants/url'

export default defineNuxtRouteMiddleware((to, from, next) => {
  console.log('middleware auth')
  if (from.path === Url.LOGIN) {
    return
  }
  const store = useMainStore()
  const main = store.getMain()
  if (!main?.auth.isAuthenticated()) {
    // 未ログイン時は、ログイン画面にリダイレクト
    return navigateTo(Url.LOGIN)
  }
})
