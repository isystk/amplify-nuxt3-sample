import { defineNuxtPlugin } from '#app'
import { Auth, CognitoUser } from '@aws-amplify/auth'

Auth.configure({
    userPoolId: process.env.USER_POOL_ID ?? '',
    identityPoolId: process.env.IDENTITY_POOL_ID ?? '',
    userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID ?? '',
    region: process.env.REGION ?? '',
})

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.provide('Auth', Auth);
    nuxtApp.vueApp.provide('CognitoUser', CognitoUser);
})

declare module '#app' {
    interface NuxtApp {
        $Auth: ReturnType<Auth>,
        $CognitoUser: ReturnType<CognitoUser>
    }
}
