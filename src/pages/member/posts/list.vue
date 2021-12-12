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
        <li>マイページ</li>
      </ul>
    </nav>
    <div class="entry-header">
      <h1 class="entry-title">投稿一覧</h1>
    </div>
    <div class="entry-content">
      <p>
        <input
          type="button"
          value="新規登録"
          @click="router.push($C.URL.MEMBER_POSTS_NEW)"
        />
      </p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>画像</th>
            <th>投稿日時</th>
            <th>
              <br />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in posts" :key="e.id" class="bg-white">
            <td
              :style="{ 'max-width': '100px', width: '25%' }"
              class="truncate"
            >
              {{ e.id }}
            </td>
            <td :style="{ width: '30%' }" class="truncate">{{ e.title }}</td>
            <td :style="{ width: '15%' }">
              <img :src="e.photo" :style="{ width: '100px' }" />
            </td>
            <td :style="{ width: '15%' }" class="text-center">
              {{ e.regist_datetime_yyyymmdd }}
            </td>
            <td :style="{ width: '15%' }" class="text-center">
              <input
                type="button"
                value="変更"
                @click.prevent="router.push(`${$C.URL.MEMBER_POSTS}/${e.id}`)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberPostsStore } from '@/stores/memberPosts'

export default defineComponent({
  setup() {
    const router = useRouter()
    const memberPostsStore = useMemberPostsStore()

    // mounted
    onMounted(async () => {
      const auth = localStorage.getItem('authorization')
      await memberPostsStore.fetchPosts(auth || '')
    })

    const posts = computed(() => {
      return memberPostsStore.getPosts()
    })

    return {
      posts,
      router,
    }
  },
})
</script>
