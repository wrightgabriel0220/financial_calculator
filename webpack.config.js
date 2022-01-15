const path = require('path');

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
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: { loader: 'ts-loader' }
      },
      { 
        enforce: "pre",
        test: "/\.js$/",
        exclude: /node_modules/,
        loader: "source-map-loader"
      }
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'eval'
}