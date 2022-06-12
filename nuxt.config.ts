import { defineNuxtConfig } from 'nuxt'

import { name, description } from './package.json'

const nuxtConfig = defineNuxtConfig({
  ssr: false, // ← SPA
  // ssr: true, // ← SSG
  target: 'static', // 静的サイトホスティング
  srcDir: 'src/',

  // 環境変数
  publicRuntimeConfig: {
    APP_NAME: name,
    APP_DESCRIPTION: description,
  },

  // https://ja.nuxtjs.org/faq/host-port/
  server: {
    port: 3000,
    // 他のパソコンから IP でつながるように host を変更
    // host: "0.0.0.0"
  },
  css: ['~/assets/sass/app.scss'],
  buildModules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@intlify/nuxt3'],
  build: {
    transpile: ['vuetify', 'moment'],
  },
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'ja-JP',
    },
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
      // https://github.com/nuxt/framework/issues/4916
      // global: {}, // ← yarn dev するときはコメントアウトを外す
    },
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
      },
    },
  },
})

export default nuxtConfig
