import { defineNuxtConfig } from 'nuxt3'

import { name, description } from './package.json'

const nuxtConfig = defineNuxtConfig({
    mode: "universal",
    srcDir: "src/",

    /**
     * 環境変数
     * ビルド時に渡される env の値は、ここに記載することで文字列に置換される
     */
    publicRuntimeConfig: {
        APP_NAME: name
    },

    // https://ja.nuxtjs.org/faq/host-port/
    server: {
        port: 3000,
        // 他のパソコンから IP でつながるように host を変更
        host: "0.0.0.0"
    },
    meta: {
        meta: [
            { hid: "charset", charset: "utf-8" },
            {hid: "viewport", name: "viewport", content: "width=device-width, initial-scale=1"},
            {hid: "description", name: "description", content: description},
            { hid: "noydir", name: "robots", content: "noydir" },
            { hid: "noodp", name: "robots", content: "noodp" },
            { hid: "index,follow", name: "robots", content: "index,follow" },
            {hid: "format-detection", name: "format-detection", content: "telephone=no"}
        ],
        bodyAttrs: {
            // bodyタグにClassを指定する場合はここに指定する
        },
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
        ]
    },
    css: [
        "vuetify/lib/styles/main.sass",
        '~/assets/app.scss',
    ],
    components: [
        {
            path: '@/components/',
            pathPrefix: false
        }
    ],

    buildModules: [
        // pinia plugin - https://pinia.esm.dev
        ['@pinia/nuxt'],
    ],
    build: {
        transpile: ['vuetify', 'moment'], // pluginがビルドエラーになるので追加
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                }
            }
        },
    },
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
})


export default nuxtConfig;
