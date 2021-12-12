import { defineNuxtPlugin } from '#app'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { NuxtApp } from '#app/nuxt'
import { Auth } from '@/auth/auth'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const router = nuxtApp.$router
  // const $C = nuxtApp.$C
  router.beforeEach(
    (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      // console.log('beforeEach', to, from)
      if (process.client) {
        if (0 <= to.path.indexOf('/member')) {
          // 未ログインの場合はログインページへ
          if (!Auth.isLogin()) {
            // router.push($C.URL.LOGIN)
            router.push('/login')
          }
        }
        if (0 <= to.path.indexOf('/login')) {
          // ログイン済みの場合はマイページTOPへ
          if (Auth.isLogin()) {
            // router.push($C.URL.MEMBER)
            router.push('/member')
          }
        }
      }
      next()
    }
  )
})
