module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "node": true
    },
    "parser": "vue-eslint-parser",
    "parserOptions": {
      "parser": "@typescript-eslint/parser"
    },
    "extends": [
      "prettier",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      "plugin:vue/recommended",
      "@vue/prettier",
      "@vue/typescript"
    ],
    "plugins": [
        "vue"
    ],
    "rules": {
        "semi": [2, "never"],
        "no-unused-vars": ["error", { "args": "none" }],
        "prettier/prettier": [
          "error",
          {
            "singleQuote": true,
            "semi": false
          },
        ],
        'vue/multi-word-component-names': ['warn'],
        'vue/no-multiple-template-root': ['warn']
    }
};
