<template>
  <v-app>
    <Header :store="main" />
    <v-main>
      <Suspense>
        <template #default>
          <slot />
        </template>
        <template #fallback> loading... </template>
      </Suspense>
    </v-main>
    <Footer :store="main" />
  </v-app>
</template>

<script lang="ts" setup>
// import { useHead } from '@vueuse/head'
import MainService from '@/services/main'
import { injectStore } from '@/stores'
const main = injectStore()
import { computed } from 'vue'

import { name, description } from '../../package.json'
// useHead({
//   title: computed(() => `${props.title || ''} | ${name}`),
//   meta: [
//     {
//       name: `description`,
//       content: computed(() => `${props.description || ''}${description}`),
//     },
//   ],
// })
</script>
