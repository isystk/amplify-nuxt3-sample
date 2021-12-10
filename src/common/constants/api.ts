/** API のエンドポイント */
export const getApiEndpoint = (config) => {
  const getBffUrl = (path: string): string => {
    return [config.externalEndpointUrl, path].join('')
  }

  return {
    /** 投稿 */
    POSTS: getBffUrl('/posts'),
  }
}
