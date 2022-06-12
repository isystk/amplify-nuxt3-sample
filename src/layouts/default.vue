<template>
  <v-app>
    <pages-header :store="main" />
    <v-main>
      <slot />
    </v-main>
    <pages-footer :store="main" />
  </v-app>
</template>

<script lang="ts" setup>
import { injectStore } from '@/store'
const main = injectStore()

const route = useRoute()
import { name, description } from '../../package.json'
useHead({
  titleTemplate: `%s - ${name}`,
  // title: route.meta.title,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'description', content: description },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  bodyAttrs: {
    // bodyタグにClassを指定する場合はここに指定する
    // class: 'column1'
  },
})
</script>
