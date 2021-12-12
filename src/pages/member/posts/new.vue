<template>
  <section>
    <nav class="breadcrumb">
      <ul>
        <li>
          <NuxtLink :to="$C.URL.HOME">
            <i class="fas fa-home" :style="{ fontSize: '16px' }"></i>
            <span>HOME</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="$C.URL.MEMBER">
            <span>マイページ</span>
          </NuxtLink>
        </li>
        <li>投稿登録</li>
      </ul>
    </nav>
    <div class="entry-header">
      <h1 class="entry-title">投稿登録</h1>
    </div>
    <div class="entry-content">
      <PagesMemberPostsForm />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
