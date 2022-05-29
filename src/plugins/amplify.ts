import { defineNuxtPlugin } from '#app'
import Amplify from '@aws-amplify/core'
import amplifyConfig from '../aws-exports'

export default defineNuxtPlugin(() => {
    Amplify.configure(amplifyConfig);
})