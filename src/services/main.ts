import Auth from '@/services/auth'
import Post from '@/services/post'

export default class MainService {
  auth: Auth
  post: Post

  constructor() {
    this.auth = new Auth(this)
    this.post = new Post(this)
  }
}
