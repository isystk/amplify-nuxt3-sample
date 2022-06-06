import MainService from '@/services/main'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { getPost, listPosts } from '@/services/graphql/queries'
import {
  createPost,
  updatePost,
  deletePost,
} from '@/services/graphql/mutations'
import { Post } from '@/services/models'
import * as _ from 'lodash'

export type Data<T> = {
  id: string
  data: T
}

export type Posts = {
  [id: string]: Data<Post>
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
      // const response = await API.get(Api.POSTS)
      // this.posts = _.mapKeys(response, 'id') as Posts
      this.main.auth.useAuthTypeApiKey()
      const postData = (await API.graphql(
        graphqlOperation(listPosts)
      )) as GraphQLResult
      // @ts-ignore
      const filterPosts = _.filter(
        postData.data.listPosts.items,
        (post) => !post._deleted
      )
      this.posts = _.mapKeys(filterPosts, 'id')
    } catch (error) {
      console.log('error read posts', error)
      alert('データ取得に失敗しました')
    }
  }

  async readPost(id: string) {
    try {
      // const response = await API.get(`${Api.POSTS}/${id}`)
      // this.posts = { ...this.posts, [id]: response }
      this.main.auth.useAuthTypeApiKey()
      const postData = await API.graphql(graphqlOperation(getPost, { id }))
      // @ts-ignore
      this.posts[id] = postData.data.getPost
    } catch (error) {
      console.log('error read posts', error)
      alert('データ取得に失敗しました')
    }
  }

  getMyPosts() {
    // return _.filter(this.posts, (post) => {
    //   return post.data.userId === this.main.auth.id
    // })
    if (!this.main.auth.id) return []
    return _.filter(this.posts, (post) => post.userID === this.main.auth.id)
  }

  async createPost(post: Post) {
    try {
      if (!this.main.auth.id) {
        throw new Error('ユーザ情報が無効です')
      }
      // await API.post(Api.POSTS, {
      //   ...post,
      //   userId: this.main.auth.id,
      // })
      const input = {
        ...post,
        userID: this.main.auth.id,
      }
      this.main.auth.useAuthTypeCognito()
      await API.graphql(
        graphqlOperation(createPost, { input }, this.main.auth.token)
      )
      await this.readPosts()
    } catch (error) {
      console.log('error create post', error)
      alert('登録に失敗しました')
    }
  }

  async updatePost(postId: string, post: Post) {
    try {
      // await API.put(`${Api.POSTS}/${postId}`, post)
      const input = {
        ...post,
        userID: this.main.auth.id,
        _version: this.posts[post.id]._version,
      } as Post
      delete input['_deleted']
      delete input['_lastChangedAt']
      this.main.auth.useAuthTypeCognito()
      await API.graphql(
        graphqlOperation(updatePost, { input }, this.main.auth.token)
      )
      await this.readPosts()
    } catch (error) {
      console.log('error update post', error)
      alert('更新に失敗しました')
    }
  }

  async deletePost(postId: string) {
    try {
      // await API.del(`${Api.POSTS}/${postId}`)
      const input = {
        id: postId,
        _version: this.posts[postId]._version,
      }
      this.main.auth.useAuthTypeCognito()
      await API.graphql(
        graphqlOperation(deletePost, { input }, this.main.auth.token)
      )
      await this.readPosts()
    } catch (error) {
      console.log('error delete post', error.errors[0]['message'])
      alert('削除に失敗しました')
    }
  }
}
