import { defineNuxtConfig } from 'nuxt3'
import {IEnv} from "~/@types/IEnv";

const pkg = require("./package");

const getEnv = (): IEnv => {
    console.log('$config.NODE_ENV: ', process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
        return {
            envName: 'product',
            internalEndpointUrl: 'https://nextjs-typescript-aws.vercel.app',
            externalEndpointUrl:
                'https://obew4p54y9.execute-api.ap-northeast-1.amazonaws.com/Prod',
        } as IEnv
    } else {
        return {
            envName: 'local',
            internalEndpointUrl: 'http://localhost:3000',
            externalEndpointUrl:
        'https://obew4p54y9.execute-api.ap-northeast-1.amazonaws.com/Prod',
        }
    }
}
console.log(getEnv())

const nuxtConfig = defineNuxtConfig({
    mode: "universal",
    srcDir: "src/",

    /**
     * 環境変数
     * ビルド時に渡される env の値は、ここに記載することで文字列に置換される
     */
    publicRuntimeConfig: {
        APP_NAME: pkg.name,
        APP_DESCRIPTION: pkg.description,
        ...getEnv(),
        AWS_REGION: process.env.AWS_REGION,
        AWS_USER_POOL_ID: process.env.AWS_USER_POOL_ID,
        AWS_CLIENT_ID: process.env.AWS_CLIENT_ID
    },

    // https://ja.nuxtjs.org/faq/host-port/
    server: {
        port: 3000,
        // // 他のパソコンから IP でつながるように host を変更
        // host: "0.0.0.0" // デフォルト: localhost
    },
    meta: {
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
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
        ]
    },
    css: [
        'vuetify/lib/styles/main.sass',
        '~/assets/app.scss',
        '@fortawesome/fontawesome-free/css/all.min.css'
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
})


export default nuxtConfig;
