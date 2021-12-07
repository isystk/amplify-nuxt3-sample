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
        <li>{{post.title}}</li>
      </ul>
      </nav>
      <div class="entry-header">
        <h1 class="entry-title">{{post.title}}</h1>
        <div class="article-img">
          <img alt="sample1" width="644" :src="post.photo" />
        </div>
        <div class=" clearfix"></div>
      </div>
      <div class="entry-content">
        <div class="entry-content">
          <p>{{post.description}}</p>
        </div>
        <div class="clearfix"></div>
        <div class="entry-meta">
          <i class="fas fa-clock" :style="{fontSize: '16px'}"></i>
          {{post.regist_datetime_yyyymmdd}}
        </div>
      </div>
    </section>
</template>


<script lang="ts">
import {defineComponent, computed, onMounted} from "vue";
import { useRoute } from 'vue-router'
import {usePostsStore} from "@/stores/posts";

export default defineComponent({
  setup() {
    const { id } = useRoute().params
    const postsStore = usePostsStore()

    // mounted
    onMounted(async () => {
      await postsStore.fetchPosts()
    })

    const displayPost = computed(() => {
      return postsStore.getPost(typeof id === "string" ? id :"")
    })

    return {
      post: displayPost
    }
  }
});

</script>
