<template>
  <v-app>
    <pages-header :store="main" />
    <v-main>
      <pages-box :breadcrumbs="[{ text: error.statusCode }]" :small="true">
        <div v-if="error.statusCode == 404" class="mb-4">
          <h1>ページが見つかりません</h1>
        </div>
        <div v-else class="mb-4">
          <h1>エラーが発生しました {{ error.message }}</h1>
        </div>
        <nuxt-link to="/">TOPへ戻る</nuxt-link>
      </pages-box>
    </v-main>
    <pages-footer :store="main" />
  </v-app>
</template>

<script lang="ts" setup>
import { injectStore } from '@/store'
const main = injectStore()
const props = defineProps<{
  error: () => {
    statusCode: number
    message: string
  }
}>()
</script>
