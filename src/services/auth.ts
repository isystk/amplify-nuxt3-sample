import { Amplify, Auth } from 'aws-amplify'
import API, { graphqlOperation } from '@aws-amplify/api'
import { getUser } from '@/services/graphql/queries'
import { createUser } from '@/services/graphql/mutations'
import MainService from '@/services/main'

export default class AuthService {
  main: MainService

  id?: string
  name: string
  token: string

  constructor(main: MainService) {
    this.main = main
    this.id = undefined
    this.name = '';
    this.token = '';
    (async () => {
      await this.signCheck();
    })()
  }

  async signOut() {
    try {
      await Auth.signOut()
      this.id = undefined
      this.name = ''
      this.token = ''
    } catch (error) {
      console.log('error signing out', error)
    }
  }

  async signIn(email: string, password: string) {
    try {
      const user = await Auth.signIn(email, password)
      if (user) {
        console.log('success signing in', user)
        this.useAuthTypeApiKey()
        const userData = await API.graphql(graphqlOperation(getUser, { userSub: user.username }))
        // @ts-ignore
        const { id, fullName } = userData.data.listUsers.items[0]
        this.id = id
        this.name = fullName
        this.token = await this.getJwtToken()
      }
    } catch (error) {
      console.log('error signing in', error)
      alert('メールアドレスまたはパスワードが違います')
    }
  }

  // @ts-ignore
  async signUp(name: string, email: string, password: string): boolean {
    try {
      const user = await Auth.signUp(email, password)
      if (user) {
        console.log('success signup', user)

        // @ts-ignore
        const input = {
          userSub: user.userSub,
          fullName: name,
          profileImageFileName: '',
        }
        this.useAuthTypeApiKey()
        await API.graphql(graphqlOperation(createUser, { input }))
        return true
      }
    } catch (error) {
      console.log('error signup in', error)
      if ((error as string).match(/UsernameExistsException/)) {
        alert('既に会員登録されています。認証済みでない場合はメールを確認してください。')
      }
      return false
    }
  }

  async signCheck() {
    console.log('signCheck')
    if (this.name) return
    const user = await Auth.currentUserInfo()
    if (user) {
      this.useAuthTypeApiKey()
      const userData = await API.graphql(graphqlOperation(getUser, { userSub: user.username }))
      // @ts-ignore
      const { id, fullName } = userData.data.listUsers.items[0]

      this.id = id
      this.name = fullName
      this.token = await this.getJwtToken()
    }

  }

  async getJwtToken() {
    console.log("getJwtToken")

    const session = await Auth.currentSession() //現在のセッション情報を取得
    console.log("session", session)
    console.log("token", session.getIdToken().getJwtToken())
    return session.getIdToken().getJwtToken()
  }

  useAuthTypeCognito() {
    Amplify.configure({
      aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    })
  }

  useAuthTypeApiKey() {
    Amplify.configure({
      aws_appsync_authenticationType: 'API_KEY',
    })
  }
}