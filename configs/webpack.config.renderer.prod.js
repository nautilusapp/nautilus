const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.tsx',
  target: 'electron-renderer',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  output: {
    filename: 'renderer.js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },
  // plugins
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
};
