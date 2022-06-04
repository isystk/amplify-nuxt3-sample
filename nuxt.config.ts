import { defineNuxtConfig } from 'nuxt'

import { name } from './package.json'

const nuxtConfig = defineNuxtConfig({
  ssr: false, // SPA (Amplifyを利用する為)
  target: 'static', // 静的サイトホスティング
  srcDir: 'src/',

  /**
   * 環境変数
   * ビルド時に渡される env の値は、ここに記載することで文字列に置換される
   */
  publicRuntimeConfig: {
    APP_NAME: name,
  },

  // https://ja.nuxtjs.org/faq/host-port/
  server: {
    port: 3000,
    // 他のパソコンから IP でつながるように host を変更
    // host: "0.0.0.0"
  },
  css: ['~/assets/sass/app.scss'],
  buildModules: [],
  build: {
    transpile: ['vuetify', 'moment'],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
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
