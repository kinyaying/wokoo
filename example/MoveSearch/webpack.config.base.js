module.exports = {
  entry: {
    app: '/src/index.js',
    vendor: [
      // 将react和react-dom这些单独打包出来，减小打包文件体积
      'react',
      'react-dom',
    ],
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
