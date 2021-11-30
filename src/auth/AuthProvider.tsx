import React, { FC, createContext, useEffect, useState, ReactNode } from 'react'
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { getUserPool } from '../utilities/aws'

type AuthContextProps = {
  currentUser: CognitoUser | null | undefined
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined })

type Props = {
  children?: ReactNode
}

const AuthProvider: FC = ({ children }: Props) => {
  const currentUser = getUserPool().getCurrentUser()

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
