export const Auth = {
  getUserId: () => {
    if (!process.client) {
      return ''
    }
    return localStorage.getItem('authorization')
  },
  setUserId: (userId: string) => {
    if (!process.client) {
      return
    }
    localStorage.setItem('authorization', userId)
  },
  isLogin: () => {
    if (!process.client) {
      return false
    }
    return (
      localStorage.getItem('authorization') ===
      'CognitoIdentityServiceProvider.b5mlqbm890h8tabqhro9bno8j.test.userData'
    )
  },
  logout: () => {
    if (!process.client) {
      return false
    }
    localStorage.removeItem('authorization')
  },
}
