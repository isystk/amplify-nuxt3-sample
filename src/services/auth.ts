import MainService from '@/services/main'
import {
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
  ISignUpResult,
} from 'amazon-cognito-identity-js'
import { getUserPool } from '@/utilities/aws'

export default class AuthService {
  main: MainService
  user: CognitoUser | null
  userName: string
  userId: string

  constructor(main: MainService) {
    this.main = main
    // const userPool = getUserPool()
    // this.user = userPool ? userPool.getCurrentUser() : null
    // this.userName = userPool
    //   ? userPool.getCurrentUser()?.getUsername() + ''
    //   : ''
    // this.userId = userPool ? userPool.getCurrentUser()?.userDataKey + '' : ''
  }

  // // ログアウト
  // signOut(): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     if (!this.user) {
  //       reject(new Error('既にログアウトされています'))
  //     } else {
  //       this.user.signOut(() => {
  //         localStorage.clear()
  //         console.log('signed out')
  //         this.user = null
  //         // window.location.reload()
  //         resolve(true)
  //       })
  //     }
  //   })
  // }
  //
  // // ログイン
  // async signIn(email: string, password: string): Promise<CognitoUser> {
  //   return new Promise((resolve, reject) => {
  //     const userPool = getUserPool()
  //     if (!userPool) {
  //       reject(new Error('no userPool'))
  //       return
  //     }
  //     const authenticationDetails = new AuthenticationDetails({
  //       Username: email,
  //       Password: password,
  //     })
  //     const cognitoUser = new CognitoUser({
  //       Username: email,
  //       Pool: userPool,
  //     })
  //     cognitoUser.authenticateUser(authenticationDetails, {
  //       onSuccess: (result) => {
  //         const accessToken = result.getAccessToken().getJwtToken()
  //         console.log('AccessToken: ' + accessToken)
  //         this.user = userPool.getCurrentUser()
  //         this.userName = userPool
  //           ? userPool.getCurrentUser()?.getUsername() + ''
  //           : ''
  //         this.userId = userPool
  //           ? userPool.getCurrentUser()?.userDataKey + ''
  //           : ''
  //         // window.location.reload()
  //         if (this.user) {
  //           resolve(this.user)
  //         }
  //       },
  //       onFailure: (err) => {
  //         console.error(err)
  //         reject(new Error('ログインに失敗しました'))
  //       },
  //       // newPasswordRequired: function (userAttributes, requiredAttributes) {
  //       //   // コンソールからユーザを登録した場合、初回認証時に強制的にパスワードを変える必要がある。
  //       //   // https://qiita.com/k_hoso/items/afe9aa8183b8bf0651a1
  //       //   cognitoUser.completeNewPasswordChallenge('Test@1234', {}, this)
  //       // },
  //     })
  //   })
  // }
  //
  // // 会員仮登録
  // async signUp(email: string, password: string): Promise<ISignUpResult> {
  //   return new Promise((resolve, reject) => {
  //     const userPool = getUserPool()
  //     if (!userPool) {
  //       reject(new Error('no userPool'))
  //       return
  //     }
  //     const attributeList = [
  //       new CognitoUserAttribute({
  //         Name: 'email',
  //         Value: email,
  //       }),
  //     ]
  //     userPool.signUp(email, password, attributeList, [], (err, result) => {
  //       if (err) {
  //         console.log('error signup in', err)
  //         if (err.message.match(/User already exists/)) {
  //           reject(
  //             new Error(
  //               '既に会員登録されています。認証済みでない場合はメールを確認してください。'
  //             )
  //           )
  //         }
  //         reject(err)
  //         return
  //       }
  //       if (!result) {
  //         reject(new Error('no SignUpResult'))
  //         return
  //       }
  //       resolve(result)
  //     })
  //   })
  // }
  //
  // // 会員登録認証
  // async confirmRegistration(
  //   email: string,
  //   verificationCode: string
  // ): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     const userPool = getUserPool()
  //     if (!userPool) {
  //       reject(new Error('no userPool'))
  //       return
  //     }
  //     const cognitoUser = new CognitoUser({
  //       Username: email,
  //       Pool: userPool,
  //     })
  //     cognitoUser.confirmRegistration(verificationCode, true, (err: any) => {
  //       if (err) {
  //         console.log(err)
  //         reject(err)
  //         return
  //       }
  //       console.log('verification succeeded')
  //       resolve(true)
  //     })
  //   })
  // }
  //
  // // 認証チェック
  // signCheck(): boolean {
  //   return !!this.user
  // }
}