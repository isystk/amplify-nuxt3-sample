/**
 * Jest Configuration
 */
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { readFileSync } = require('fs')
const { parse } = require('jsonc-parser')
// extendsを自動的に解決してマージできないため、compilerOptions.pathsを書いているファイルを指定する
const { compilerOptions } = parse(readFileSync('./tsconfig.json').toString())
const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
})

module.exports = {
  roots: ["<rootDir>/"],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  transformIgnorePatterns: ['node_modules/(?!vue-awesome|pages-generated)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '.*\\.(vue)$': 'vue3-jest',
  },
}