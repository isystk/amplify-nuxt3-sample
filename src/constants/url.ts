/**
 * フロントエンド用の URL を作成する
 */
const getFrontUrl = (path: string): string => {
  return ['', path].join('')
}

/** API のエンドポイント */
export const Url = {
  /** TOP */
  TOP: getFrontUrl('/'),
  /** ログイン */
  LOGIN: getFrontUrl('/login'),
  /** 会員登録 */
  SIGNUP: getFrontUrl('/signup'),
  /** 会員登録承認 */
  SIGNUP_VERIFICATION: getFrontUrl('/signup/verification'),
  /** 投稿詳細 */
  POSTS: getFrontUrl('/posts'),
  /** マイページ */
  MEMBER: getFrontUrl('/member'),
}
