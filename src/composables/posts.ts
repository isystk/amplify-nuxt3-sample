import {computed, inject, ref, Ref} from "vue";
import { defineStore } from "pinia";
import { API } from '@/utilities'
import { getApiEndpoint } from '@/common/constants/api'
import { useRuntimeConfig } from "#app";
import {Data, Post, Posts} from "~/@types/Posts";

interface PostsState {
    items: Posts[]
}

type PostDisplay = Post & {
    id: string
    regist_data_yyyymmdd: string
}

export const usePostsStore = defineStore('posts', {
    state: (): PostsState => ({
        items: []
    }),
    getters: {
      displayPosts(): PostDisplay {
          const _ = inject('lodash')
          const moment = inject('moment')

          // data
          return _.map(this.items, function (e: Data<Post>) {
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
    },
    actions: {
        async fetchPosts() {
            const config = useRuntimeConfig();
            this.items = await API.get(getApiEndpoint(config).POSTS)
        }
    }
})

