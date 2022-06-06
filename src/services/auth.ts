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
    this.name = ''
    this.token = ''
  }

  async signOut(): Promise<boolean> {
    try {
      await Auth.signOut()
      this.id = undefined
      this.name = ''
      this.token = ''
      return true
    } catch (error) {
      console.log('error signing out', error)
      return false
    }
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      const user = await Auth.signIn(email, password)
      if (user) {
        console.log('success signing in', user)
        this.useAuthTypeApiKey()
        const userData = await API.graphql(
          graphqlOperation(getUser, { userSub: user.username })
        )
        // @ts-ignore
        const { id, fullName } = userData.data.listUsers.items[0]
        this.id = id
        this.name = fullName
        this.token = await this.getJwtToken()
        return true
      }
      return false
    } catch (error) {
      console.log('error signing in', error)
      alert('メールアドレスまたはパスワードが違います')
      return false
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
        alert(
          '既に会員登録されています。認証済みでない場合はメールを確認してください。'
        )
      }
      return false
    }
  }

  // 会員登録認証
  async confirmRegistration(
    email: string,
    verificationCode: string
  ): Promise<boolean> {
    try {
      const result = await Auth.confirmSignUp(email, verificationCode)
      if (result !== 'SUCCESS') {
        new Error('メールアドレス検証に失敗しました')
      }

      // NOTE: デフォルトの挙動だと検証する前にメールアドレスを変更してしまうので、
      // その対応としてcustome:verified_emailに古いメアドを指定する。詳しくは以下のリンクを参照。
      // https://zenn.dev/dove/articles/78ecf08b51ee0c

      // 上記対応をしないのであればこの処理は不要
      const user = await Auth.currentAuthenticatedUser()
      await Auth.updateUserAttributes(user, {
        email, // ここと
        'custom:verified_email': email, // ここに新しいメールアドレスをいれる。
      })

      return true
    } catch (error) {
      console.log('error signup in', error)
      if ((error as string).match(/UsernameExistsException/)) {
        alert(
          '既に会員登録されています。認証済みでない場合はメールを確認してください。'
        )
      }
      return false
    }
  }

  async signCheck() {
    try {
      if (this.name) return
      const user = await Auth.currentUserInfo()
      if (user) {
        await this.useAuthTypeApiKey()
        const userData = await API.graphql(
          graphqlOperation(getUser, { userSub: user.username })
        )
        // @ts-ignore
        const { id, fullName } = userData.data.listUsers.items[0]

        this.id = id
        this.name = fullName
        this.token = await this.getJwtToken()
        console.log('signCheck', this)
      }
    } catch (error) {
      return
    }
  }

  isAuthenticated() {
    return this.token !== ''
  }

  async getJwtToken() {
    const session = await Auth.currentSession() //現在のセッション情報を取得
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
