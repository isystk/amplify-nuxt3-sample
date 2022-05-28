<template>
  <NuxtLayout :store="main" title="TOP">
    page content
  </NuxtLayout>
</template>

<script setup lang="ts">
// import { computed, onBeforeMount } from 'vue'
// import { Url } from '@/constants/url'
// import { useI18n } from 'vue-i18n'
// const { t } = useI18n()
import { injectStore } from '@/stores'
const main = injectStore()
// onBeforeMount(async () => {
//   // 投稿一覧の取得
//   await main?.post?.readPosts()
// })
// const posts = computed(() => main?.post?.posts)
</script>