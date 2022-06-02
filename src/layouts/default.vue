<template>
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
const main = injectStore()
</script>
