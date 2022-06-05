import Auth from '@/services/auth'
import Post from '@/services/post'

export default class MainService {
  _setMainService: (main: MainService) => void
  auth: Auth
  post: Post

  constructor(setMainService: (main: MainService) => void) {
    this._setMainService = setMainService
    this.auth = new Auth(this)
    this.post = new Post(this)
  }

  setMainService() {
    this._setMainService(this)
  }
}
