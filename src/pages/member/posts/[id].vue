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
        <li>投稿変更</li>
      </ul>
    </nav>
    <div class="entry-header">
      <h1 class="entry-title">投稿変更</h1>
    </div>
    <div class="entry-content">
      <PagesMemberPostsForm v-if="!nowLoading" v-model:post="post" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMemberPostsStore } from '@/stores/memberPosts'

export default defineComponent({
  setup() {
    const { id } = useRoute().params
    const memberPostsStore = useMemberPostsStore()
    const nowLoading = ref(true)

    // mounted
    onMounted(async () => {
      await memberPostsStore.fetchPost(id)
      nowLoading.value = false
    })

    const displayPost = computed(() => {
      return memberPostsStore.getPost(typeof id === 'string' ? id : '')
    })

    return {
      post: displayPost,
      nowLoading,
    }
  },
})
</script>
