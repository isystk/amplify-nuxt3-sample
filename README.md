ð amplify-nuxt3-sample
====

[![CircleCI](https://circleci.com/gh/isystk/amplify-nuxt3-sample/tree/master.svg?style=svg)](https://circleci.com/gh/isystk/amplify-nuxt3-sample/tree/master)
![GitHub issues](https://img.shields.io/github/issues/isystk/amplify-nuxt3-sample)
![GitHub forks](https://img.shields.io/github/forks/isystk/amplify-nuxt3-sample)
![GitHub stars](https://img.shields.io/github/stars/isystk/amplify-nuxt3-sample)
![GitHub license](https://img.shields.io/github/license/isystk/amplify-nuxt3-sample)

## ð ãã­ã¸ã§ã¯ãã®æ¦è¦

AWS Amplify ã®å­¦ç¿ç¨ãµã³ãã«ã¢ããªã±ã¼ã·ã§ã³ã§ãã


### å©ç¨ãã¦ããæè¡

- Nuxt.js 3
- Typescript
- Vuetify
- TailwindCSS & Sass
- Amplify (Cognito/AppSync/DynamoDB)
- GraghQL
- Storybook

## ð Demo
https://dev.dl83z1vvxx26n.amplifyapp.com

![TOPç»é¢](./app1.png "TOPç»é¢")
![ãã¤ãã¼ã¸ä¸è¦§](./app2.png "ãã¤ãã¼ã¸ä¸è¦§")
![æç¨¿ãã©ã¼ã ](./app3.png "æç¨¿ãã©ã¼ã ")


## ð§  AWS ã¯ã©ã¤ãä¸ã«amplifyã®ç°å¢ãæ§ç¯ãã
```text
$ rm -Rf amplify
$ amplify init
? Initialize the project with the above configuration? No
? Enter a name for the environment dev
? Choose your default editor: IntelliJ IDEA
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: .output/public
? Build Command:  npm run build
? Start Command: npm run start
Using default provider  awscloudformation
? Select the authentication method you want to use: (Use arrow keys)
â¯ AWS profile 
  AWS access keys (node:42574) [DEP0128] DeprecationWarning: Invalid 'main' field in '/Users/iseyoshitaka/.nodebrew/node/v16.13.1/lib/node_modules/@aws-amplify/cli/node_modules/cloudform/package.json' of 'packages/cloudform/index.js
? Select the authentication method you want to use: AWS profile

# init ã§ä½æããç°å¢ã AWS ããä¸æ¬ã§åé¤ãããå ´å
$ amplify delete
```

## ð¦ ãã£ã¬ã¯ããªæ§é 

```
.
âââ LICENSE
âââ README.md
âââ amplify
â   âââ README.md
â   âââ backend
â   âââ cli.json
â   âââ hooks
â   âââ team-provider-info.json
âââ node_modules
âââ nuxt.config.ts
âââ package.json
âââ src
â   âââ __tests__
â   âââ app.vue
â   âââ assets
â   âââ aws-exports.js
â   âââ components
â   âââ constants
â   âââ layouts
â   âââ locales
â   âââ middleware
â   âââ mixins
â   âââ pages
â   âââ plugins
â   âââ public
â   âââ services
â   âââ store
â   âââ stories
âââ tailwind.config.js
âââ tsconfig.jest.json
âââ tsconfig.json
âââ yarn.lock
```


## ðï¸amplify ã®å©ç¨æ¹æ³

```shell
# amplify ã³ãã³ããã¤ã³ã¹ãã¼ã«ãã
$ npm install -g @aws-amplify/cli
$ amplify -v
8.3.1

# amplify ãå©ç¨ããçºã®è¨­å®
$ amplify configure
? user name:  amplify-lBpzV

# AWS ãã amplify ã®ç¶æãã­ã¼ã«ã«ã«åãè¾¼ã
$ amplify pull --appId dl83z1vvxx26n --envName dev

# ã­ã¼ã«ã« ã®ç¶æã AWS ã® amplify ã¸åæ ãã
$ amplify push

# ææ°ã¢ã¸ã¥ã¼ã«ããã¹ãã£ã³ã°ç°å¢ã«ããã­ã¤ãã
$ amplify publish
```

## ð¬ ä½¿ãæ¹
```text
# edit nuxt.config.ts
// global: {}, // â yarn dev ããã¨ãã¯ã³ã¡ã³ãã¢ã¦ããå¤ãã¦ä¸ãã
# module install
yarn
# app run
yarn dev
```

## ð¨ åè

| ãã­ã¸ã§ã¯ã| æ¦è¦|
| :---------------------------------------| :-------------------------------|
| [Nuxt3 Docs](https://v3.nuxtjs.org/guide/concepts/introduction)| Nuxt3 Docs |
| [Vuetify 3 Beta](https://next.vuetifyjs.com/en/getting-started/installation/)| Vuetify 3 Beta |
| [AWS Amplifyãã¯ããã¦ã¿ãç·¨](https://qiita.com/t_okkan/items/38aca98993bf06598af6)| AWS Amplifyãã¯ããã¦ã¿ãç·¨ |
| [Material Design Icons](https://pictogrammers.github.io/@mdi/font/2.0.46/)| Material Design Icons |
| [Tailwind CSS](https://tailwindcss.com/docs/installation)| Tailwind CSS |
| [vee-validate](https://vee-validate.logaretm.com/v4/guide/components)| vee-validate |
| [husky v6 ã®ã¤ã³ã¹ãã¼ã«æ¹æ³ã¨ä½¿ãæ¹ãlint-staged ãå°å¥ãã¦ãåè³ªãä¿ã¨ã](https://fwywd.com/tech/husky-setup)| husky v6 ã®ã¤ã³ã¹ãã¼ã«æ¹æ³ã¨ä½¿ãæ¹ãlint-staged ãå°å¥ãã¦ãåè³ªãä¿ã¨ã |


## ð« Licence

[MIT](https://github.com/isystk/amplify-nuxt3-sample/blob/master/LICENSE)

## ð Author

[isystk](https://github.com/isystk)

