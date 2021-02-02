module.exports = {
  entry: {
    app: '/src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //匹配js文件
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
          },
        },
      },
    ],
  },
}
