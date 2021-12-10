<template>
  <section v-for="e in posts" :key="e.id">
    <NuxtLink :to="`${$C.URL.POSTS}/${e.id}`">
      <div class="entry-header">
        <div class="category_NuxtLink">{{ e.tagName }}</div>
        <h2 class="entry-title">{{ e.title }}</h2>
        <div class="entry-meta">
          <span>{{ e.regist_datetime_yyyymmdd }}</span>
        </div>
      </div>
      <div class="entry-content">
        <img
          alt="sample1"
          width="300"
          height="174"
          :src="e.photo"
          class="attachment-medium size-medium wp-post-image"
        />
        <p>{{ e.description }}</p>
        <div class="clearfix"></div>
      </div>
    </NuxtLink>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'

export default defineComponent({
  setup() {
    const postsStore = usePostsStore()

    // mounted
    onMounted(async () => {
      await postsStore.fetchPosts()
    })

    const posts = computed(() => postsStore.getPosts())

    return {
      posts,
    }
  },
})
</script>
