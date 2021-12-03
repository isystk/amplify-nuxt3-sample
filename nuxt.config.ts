import { defineNuxtConfig } from 'nuxt3'

const pkg = require("./package");
const PUBLIC_PATH = process.env.PUBLIC_PATH || "/";

const nuxtConfig = defineNuxtConfig({
    mode: "universal",
    srcDir: "src/",

    /**
     * 環境変数
     * ビルド時に渡される env の値は、ここに記載することで文字列に置換される
     */
    env: {
        APP_NAME: pkg.name,
        APP_DESCRIPTION: pkg.description,
        AWS_REGION: process.env.AWS_REGION,
        AWS_USER_POOL_ID: process.env.AWS_USER_POOL_ID,
        AWS_CLIENT_ID: process.env.AWS_CLIENT_ID
    },

    // https://ja.nuxtjs.org/faq/host-port/
    server: {
        port: 3000,
        // 他のパソコンから IP でつながるように host を変更
        host: "0.0.0.0" // デフォルト: localhost
    },
    meta: {
        titleTemplate: "%s | " + pkg.name,
        meta: [
            { hid: "charset", charset: "utf-8" },
            {
                hid: "viewport",
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: pkg.description
            },
            { hid: "noydir", name: "robots", content: "noydir" },
            { hid: "noodp", name: "robots", content: "noodp" },
            { hid: "index,follow", name: "robots", content: "index,follow" },
            {
                hid: "format-detection",
                name: "format-detection",
                content: "telephone=no"
            }
        ],
        bodyAttrs: {
          class: 'column1'
        },
        link: [
            { rel: "icon", type: "image/x-icon", href: PUBLIC_PATH + "favicon.ico" }
        ]
    },
    buildModules: [
        // pinia plugin - https://pinia.esm.dev
        ['@pinia/nuxt']
    ],
    build: {
        // vue-devtools を許可するかどうかを設定します
        // https://ja.nuxtjs.org/api/configuration-build/#devtools
        devtools: true,
        transpile: ['moment'], // pluginがビルドエラーになるので追加
        extend(config, ctx) {},
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                }
            }
        },
    }
})


export default nuxtConfig;
