import { IEnv } from '@/@types/IEnv'
import EnvLocal from './env.local'

const getEnv = (): IEnv => {
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'production') {
    /** docker のビルド環境の環境変数から値を取ってくる */
    return {
      envName: 'product',
      internalEndpointUrl: 'https://nextjs-typescript-aws.vercel.app',
      externalEndpointUrl:
          'https://obew4p54y9.execute-api.ap-northeast-1.amazonaws.com/Prod',
    } as IEnv
  } else {
    /** docker でビルドされていない場合は、 .env.local から値を取ってくる */
    return EnvLocal
  }
}

export const Env = getEnv()