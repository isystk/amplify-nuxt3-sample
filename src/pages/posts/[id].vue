<template>
  <div v-if="loading">Loading..</div>
  <div v-else>
    <pages-box :breadcrumbs="[{ text: post.title }]">
      <v-img :src="post.photo" />

      <p class="pb-3">
        {{ post.description }}
      </p>
    </pages-box>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed, ref } from 'vue'
import { Post } from '@/services/models'
import { injectStore } from '@/store'
const main = injectStore()
const route = useRoute()

const id = ref<string>()
const loading = ref<boolean>(true)

onBeforeMount(async () => {
  id.value = route.params.id + ''
  // 投稿詳細の取得
  await main?.post?.readPost(id.value + '')
  loading.value = false
})

const post = computed<Post>(() => {
  const d = main?.post?.posts[id.value]
  if (!d) {
    return {
      userId: '',
      title: '',
      description: '',
      photo: '',
    }
  }

  useMeta({
    title: d.title,
  })

  return d
})
</script>
