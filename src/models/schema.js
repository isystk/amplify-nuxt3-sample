export const schema = {
  models: {
    User: {
      name: 'User',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        userSub: {
          name: 'userSub',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        fullName: {
          name: 'fullName',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        profileImageFileName: {
          name: 'profileImageFileName',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        Posts: {
          name: 'Posts',
          isArray: true,
          type: {
            model: 'Post',
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'userID',
          },
        },
      },
      syncable: true,
      pluralName: 'Users',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                operations: ['update', 'delete'],
                identityClaim: 'cognito:username',
              },
              {
                allow: 'public',
                operations: ['read', 'create'],
              },
            ],
          },
        },
      ],
    },
    Post: {
      name: 'Post',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        title: {
          name: 'title',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        description: {
          name: 'description',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        photo: {
          name: 'photo',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        authorId: {
          name: 'authorId',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        userID: {
          name: 'userID',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
      },
      syncable: true,
      pluralName: 'Posts',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'key',
          properties: {
            name: 'byUser',
            fields: ['userID'],
          },
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'authorId',
                allow: 'owner',
                operations: ['create', 'update', 'delete'],
                identityClaim: 'cognito:username',
              },
              {
                allow: 'public',
                operations: ['read'],
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: '28a82da4d669eca2f97a8db61eb07dab',
}
