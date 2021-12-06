<template>
   <section>
     <nav class="breadcrumb">
      <ul>
        <li>
            <a>
              <i class="fas fa-home" :style="{fontSize: '16px'}"></i>
              <span>HOME</span>
            </a>
        </li>
        <li>{{post.title}}</li>
      </ul>
      </nav>
      <div class="entry-header">
        <h1 class="entry-title">{{post.title}}</h1>
        <div class="article-img">
          <img alt="sample1" width="644" src="/hoge.jpg" />
        </div>
        <div class=" clearfix"></div>
      </div>
      <div class="entry-content">
        <div class="entry-content">
          <p>xxxxxxxxxxxxxxxxxxxxxxxx</p>
        </div>
        <div class="clearfix"></div>
        <div class="entry-meta">
          <i class="fas fa-clock" :style="{fontSize: '16px'}"></i>
          2021/11/02
        </div>
      </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, onMounted, inject } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useState } from '#app'
import {usePostsStore} from "@/stores/posts";
import {useTodoStore} from "@/stores/todos";
import {Data, Post} from "~~/nextjs-typescript-aws/src/store/StoreTypes";
import { storeToRefs } from 'pinia'

import { API } from '@/utilities'
import { getApiEndpoint } from '@/common/constants/api'
import { useRuntimeConfig } from "#app";
type PostDisplay = Post & {
  id: string
  regist_data_yyyymmdd: string
}

export default defineComponent({
  setup() {

    const { id } = useRoute().params
    const postsStore = usePostsStore()
    const posts = ref({})

    // mounted
    onMounted(async () => {
      if (typeof id === "string") {
        const config = useRuntimeConfig();
        const _ = inject('lodash')
        const response = await API.get(getApiEndpoint(config).POSTS)
        const posts = _.mapKeys(response, 'id')
        console.log(posts)
        posts.value = posts
      }
    })

    const { readposts } = storeToRefs(postsStore)
    console.log(readposts.value)

   const post = (): PostDisplay[] => {
      // data
      return _.map(readposts.value, function (e: Data<Post>) {
        const data = e.data
        return {
          id: e.id,
          ...data,
          regist_datetime_yyyymmdd: data.regist_datetime
              ? moment(data.regist_datetime).format('YYYY/MM/DD')
              : '',
        } as PostDisplay
      })

    }

    return {
      post: post[id] || {},
    }
  }

});
</script>