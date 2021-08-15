const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/client/src/index.js'),
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devtool: 'eval-source-map'
}