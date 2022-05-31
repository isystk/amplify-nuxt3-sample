/**
 * BFF（バックエンドフォーフロントエンド）用の URL を作成する
 */
const getBffUrl = (path: string): string => {
  return [import.meta.env.VITE_EXTERNAL_ENDPOINT, path].join('')
}

/** API のエンドポイント */
export const Api = {
  /** 投稿 */
  POSTS: getBffUrl('/posts'),
}
