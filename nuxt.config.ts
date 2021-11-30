import { defineNuxtConfig } from 'nuxt3'

const nuxtConfig = defineNuxtConfig({
    mode: "universal",
    srcDir: "src/",
    buildModules: [
        // pinia plugin - https://pinia.esm.dev
        ['@pinia/nuxt']
    ],
    build: {
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
