import { inject, ref } from 'vue'
import { defineStore } from 'pinia'
import { API } from '@/utilities'
import { getApiEndpoint } from '@/common/constants/api'
import { useRuntimeConfig } from '#app'
import { Data, Post, Posts } from '~/@types/Posts'

type PostDisplay = Post & {
  id: string
  regist_datetime_yyyymmdd: string
}

export const useMemberPostsStore = defineStore('memberPosts', () => {
  const config = useRuntimeConfig()
  const posts = ref<Posts>({})

  // method
  const getPosts = () => {
    const _ = inject('lodash')
    return _.map(posts.value, function (e: Data<Post>) {
      return getDisplayPosts(e)
    })
  }
  const getPost = (id: string) => {
    const e = posts.value[id]
    return getDisplayPosts(e)
  }
  const getDisplayPosts = (e: Data<Post>): Partial<PostDisplay> => {
    if (!e) {
      return {}
    }
    const moment = inject('moment')
    const data = e.data
    return {
      id: e.id,
      ...data,
      regist_datetime_yyyymmdd: data.regist_datetime
        ? moment(data.regist_datetime).format('YYYY/MM/DD')
        : '',
    } as PostDisplay
  }
  const fetchPosts = async (userId: string) => {
    const _ = inject('lodash')
    const response = await API.get(
      `${getApiEndpoint(config).POSTS}?userId=${userId}`
    )
    posts.value = _.mapKeys(response, 'id')
  }
  const fetchPost = async (id: string) => {
    const response = await API.get(`${getApiEndpoint(config).POSTS}/${id}`)
    posts.value = { ...posts.value, [id]: response }
  }
  const registPost = async (value: Post) => {
    const response = await API.post(getApiEndpoint(config).POSTS, value)
    posts.value = { ...posts.value, [response.id]: response }
  }
  const updatePost = async (id: string, value: Post) => {
    const response = await API.put(
      `${getApiEndpoint(config).POSTS}/${id}`,
      value
    )
    posts.value = { ...posts.value, [response.id]: response }
  }
  const deletePost = async (id: string) => {
    await API.del(`${getApiEndpoint(config).POSTS}/${id}`)
    delete posts.value[id]
    posts.value = { ...posts.value }
  }

  return {
    posts,
    getPosts,
    getPost,
    fetchPosts,
    fetchPost,
    registPost,
    updatePost,
    deletePost,
  }
})
