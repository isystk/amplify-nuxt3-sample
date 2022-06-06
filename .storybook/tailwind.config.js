const path = require('path')

module.exports = {
  presets: [path.resolve(__dirname, '..', 'tailwind.config.js')],
  content: [path.join(__dirname, '../libs/**/*.(js|jsx|ts|tsx|vue)')],
  theme: {},
  plugins: [],
}
