import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from '@aws-amplify/datastore'

type UserMetaData = {
  readOnlyFields
}

type PostMetaData = {
  readOnlyFields
}

export declare class User {
  readonly id: string
  readonly userSub: string
  readonly fullName: string
  readonly profileImageFileName: string
  readonly createdAt?: string | null
  readonly updatedAt?: string | null
  readonly Posts?: (Post | null)[] | null
  constructor(init: ModelInit<User>)
  static copyOf(
    source: User,
    mutator: (draft: MutableModel<User>) => MutableModel<User> | void
  ): User
}

export declare class Post {
  readonly id: string
  readonly title?: string | null
  readonly description?: string | null
  readonly photo?: string | null
  readonly authorId?: string | null
  readonly createdAt?: string | null
  readonly updatedAt?: string | null
  readonly userID: string
  constructor(init: ModelInit<Post>)
  static copyOf(
    source: Post,
    mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void
  ): Post
}
