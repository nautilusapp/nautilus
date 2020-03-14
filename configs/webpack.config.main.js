const path = require('path');

export default {
  mode: process.env.NODE_ENV,
  entry: './main.ts',
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', '/dist'),
    publicPath: 'dist/',
    filename: 'main.js',
  },
};
