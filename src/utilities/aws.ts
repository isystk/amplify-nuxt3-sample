import { CognitoUserPool } from 'amazon-cognito-identity-js'

const config = {
  region: import.meta.env.VITE_AWS_REGION,
  UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
  ClientId: import.meta.env.VITE_AWS_CLIENT_ID,
}

export const getUserPool = () => {
  if (!config.UserPoolId || !config.ClientId) {
    return null
  }
  return new CognitoUserPool({
    UserPoolId: config.UserPoolId,
    ClientId: config.ClientId,
  })
}
//
// export const isAuthenticated = (): Promise<boolean> => {
//   return new Promise((resolve, reject) => {
//     const userPool = getUserPool()
//     if (!userPool) {
//       resolve(false)
//       return
//     }
//     const cognitoUser = userPool.getCurrentUser()
//     if (cognitoUser != null) {
//       cognitoUser.getSession((err, session) => {
//         if (err) {
//           console.error(err)
//           reject(err)
//           return
//         }
//         console.log(session)
//         resolve(true)
//       })
//     } else {
//       resolve(false)
//     }
//   })
// }