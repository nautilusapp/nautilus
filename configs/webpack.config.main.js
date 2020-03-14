const path = require('path');

let filename =
  process.env.NODE_ENV === 'production' ? 'main.js' : 'main.dev.js';

module.exports = {
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
    path: path.resolve(__dirname, '..', 'dist'),
    filename: filename,
  },
};
