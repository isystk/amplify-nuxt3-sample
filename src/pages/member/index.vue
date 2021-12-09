<template>
  <section>
    <nav class="breadcrumb">
      <ul>
        <li>
          <NuxtLink :to="$C.URL.HOME">
            <i class="fas fa-home" :style="{fontSize: '16px'}"></i>
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
          onClick=""
          value="新規登録"
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
          <td :style="{'max-width': '100px', 'width': '25%'}" class="truncate">{{e.id}}</td>
          <td :style="{'width': '30%'}" class="truncate">{{e.title}}</td>
          <td :style="{'width': '15%'}"><img :src="e.photo" :style="{width:'100px'}" /></td>
          <td :style="{'width': '15%'}" class="text-center">{{e.regist_datetime_yyyymmdd}}</td>
          <td :style="{'width': '15%'}" class="text-center">
            <input
                type="button"
                @click=""
                value="変更"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent, computed, onMounted} from "vue";
import {useRoute, useRouter} from 'vue-router'
import {useMemberPostsStore} from "@/stores/memberPosts";
import memberPosts from "~~/nextjs-typescript-aws/src/store/slice/memberPosts";

export default defineComponent({
  setup() {
    const { $C } = useNuxtApp()
    const router = useRouter()
    const memberPostsStore = useMemberPostsStore()

    // mounted
    onMounted(async () => {
      const auth = localStorage.getItem('authorization')
      if (auth !== 'test') {
        router.push($C.URL.LOGIN)
      }
      const userId = 'CognitoIdentityServiceProvider.b5mlqbm890h8tabqhro9bno8j.test.userData'
      await memberPostsStore.fetchPosts(userId)
    })

    const posts = computed(() => {
      return memberPostsStore.getPosts()
    })

    return {
      posts
    }
  }
});
</script>