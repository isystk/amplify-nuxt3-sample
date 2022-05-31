import { defineNuxtPlugin } from '#app'
import amplifyConfig from '../aws-exports'
import { Amplify } from '@aws-amplify/core'

export default defineNuxtPlugin(() => {
  Amplify.configure(amplifyConfig)
})
