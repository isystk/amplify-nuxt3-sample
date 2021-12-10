/**
 * @file 定数をグローバルにセットする
 */
import { defineNuxtPlugin, useState } from '#app'
import { URL } from "../common/constants/url";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('C', {
    URL
  });
})

declare module '#app' {
  interface NuxtApp {
    $C: Const
  }
}

type Const = {
  URL
}