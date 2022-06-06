import { defineNuxtRouteMiddleware } from 'nuxt/app'
import { useMainStore } from '@/store/main'
import { Url } from '@/constants/url'
import { useRouter } from 'nuxt/app'

export default defineNuxtRouteMiddleware(async (to, from, next) => {
  console.log('middleware authcheck.global')
  const store = useMainStore()
  const main = store.getMain()
  // ログインチェック
  await main?.auth.signCheck()
})
