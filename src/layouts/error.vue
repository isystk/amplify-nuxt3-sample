<template>
  <v-app>
    <pages-header :store="main" />
    <v-main>
      <div class="card">
        <article class="card-body">
          <div v-if="error.statusCode === 404">
            <h1>ページが見つかりません</h1>
          </div>
          <div v-else>
            <h1>エラーが発生しました {{ error.message }}</h1>
          </div>
          <nuxt-link to="/">
            ホーム
          </nuxt-link>
        </article>
      </div>
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
