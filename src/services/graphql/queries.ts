export const getUser = `query GetUser($userSub: String) {
  listUsers(filter: {userSub: {eq: $userSub}}) {
    items {
      id
      userSub
      fullName
      profileImageFileName
      updatedAt
      createdAt
      _deleted
      _lastChangedAt
      _version
    }
  }
}
`
export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    title
    description
    photo
    authorId
    userID
    _deleted
    _lastChangedAt
    _version
    createdAt
    updatedAt
  }
}
`
export const listPosts = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      photo
      authorId
      userID
      _deleted
      _lastChangedAt
      _version
      createdAt
      updatedAt
    }
    nextToken
  }
}
`
