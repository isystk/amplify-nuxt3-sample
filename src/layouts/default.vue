<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
  </Head>
  <v-app>
    <pages-header :store="main" />
    <v-main>
      <Suspense>
        <template #default>
          <slot />
        </template>
        <template #fallback> loading... </template>
      </Suspense>
    </v-main>
    <pages-footer :store="main" />
  </v-app>
</template>

<script lang="ts" setup>
import { injectStore } from '@/store'
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'nuxt/app'
const main = injectStore()
onBeforeMount(async () => {
  await main?.auth.signCheck()
})
const route = useRoute()
import { name, description as _description } from '../../package.json'
const title = computed(() => `${route.meta.title || ''} - ${name}`)
const description = computed(() => `${route.meta.title || ''}、${_description}`)
useHead({
  // titleTemplate: `%s - ${name}`,
  // title: route.meta.title,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' },
    // { name: 'description', content: description },
    { name: 'og:title', content: `App Name - ${route.meta.title || ''}` },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  bodyAttrs: {
    // bodyタグにClassを指定する場合はここに指定する
    // class: 'column1'
  },
})
</script>
