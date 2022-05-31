import MainService from '@/services/main'
import { API } from '@/utilities/api'
import { Api } from '@/constants/api'
import * as _ from 'lodash'

export type Data<T> = {
  id: string
  data: T
}

export type Posts = {
  [id: string]: Data<Post>
}

export type Post = {
  userId: string
  title: string
  description: string
  regist_datetime?: Date
  photo: string
}

export default class PostService {
  main: MainService
  posts: Posts

  constructor(main: MainService) {
    this.main = main
    this.posts = {}
  }

  async readPosts() {
    try {
      const response = await API.get(Api.POSTS)
      this.posts = _.mapKeys(response, 'id') as Posts
    } catch (error) {
      console.log('error read posts', error)
      alert('データ取得に失敗しました')
    }
  }

  async readPost(id: string) {
    try {
      const response = await API.get(`${Api.POSTS}/${id}`)
      this.posts = { ...this.posts, [id]: response }
    } catch (error) {
      console.log('error read posts', error)
      alert('データ取得に失敗しました')
    }
  }

  getMyPosts() {
    // const response = await API.get(`${Api.POSTS}?userId=${this.main.auth.userId}`)
    // return _.mapKeys(response, 'id') as Posts
    return _.filter(this.posts, (post) => {
      return post.data.userId === this.main.auth.userId
    })
  }

  async createPost(values: Post) {
    try {
      if (!this.main.auth.userId) {
        throw new Error('ユーザ情報が無効です')
      }
      await API.post(Api.POSTS, {
        ...values,
        userId: this.main.auth.userId,
      })
    } catch (error) {
      console.log('error create post', error)
      alert('登録に失敗しました')
    }
  }

  async updatePost(postId: string, values: Post) {
    try {
      await API.put(`${Api.POSTS}/${postId}`, values)
    } catch (error) {
      console.log('error update post', error)
      alert('更新に失敗しました')
    }
  }

  async deletePost(postId: string) {
    try {
      await API.del(`${Api.POSTS}/${postId}`)
    } catch (error) {
      console.log('error delete post', error)
      alert('削除に失敗しました')
    }
  }
}
