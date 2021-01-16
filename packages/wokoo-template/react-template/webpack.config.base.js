const { merge } = require('webpack-merge')
const base = require('./webpack.config.base')

module.exports = merge(base, {
  entry: {
    app: '/src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
    ],
  },
})
