/**
 * @file 定数をグローバルにセットする
 */
import { defineNuxtPlugin } from '#app'
import * as C from "../common/constants";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('C', C);
})

declare module '#app' {
  interface NuxtApp {
    $C: Object
  }
}