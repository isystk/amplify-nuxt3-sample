<template>
  <section v-for="e in posts" :key="e.id">
      <a>
        <div class="entry-header">
          <div class="category_NuxtLink">{{e.tagName}}</div>
          <h2 class="entry-title">{{e.title}}</h2>
          <div class="entry-meta">
            <span>{{e.regist_datetime_yyyymmdd}}</span>
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
          <p>{{e.description}}</p>
          <div class="clearfix"></div>
        </div>
      </a>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, onMounted, inject } from "vue";
import {usePostsStore} from "@/composables/posts";
import {Data, Post} from "~~/nextjs-typescript-aws/src/store/StoreTypes";

type PostDisplay = Post & {
  id: string
  regist_data_yyyymmdd: string
}

export default defineComponent({
  setup() {

    // mounted
    onMounted(async () => {
      await postsStore.fetchPosts()
    })

    const postsStore = usePostsStore()
    const displayPosts = computed(() => postsStore.displayPosts);

    return {
      posts: displayPosts,
    }
  }
});

</script>
