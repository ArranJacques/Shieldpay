const path = require('path');
const slsw = require('serverless-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isLocal = slsw.lib.webpack.isLocal;

module.exports = {
  mode: isLocal ? 'development' : 'production',
  devtool: 'inline-cheap-module-source-map',
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.build'),
    filename: '[name].js'
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            allowTsInNodeModules: true,
            transpileOnly: isLocal
          }
        },
        include: [
          /src/,
          /node_modules\/validate/
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin]
  }
};
