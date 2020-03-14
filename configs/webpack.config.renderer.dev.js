const path = require('path');
const { EnviornmentPlugin, HotModuleReplacementPlugin } = require('webpack');

export default {
  mode: process.env.NODE_ENV,
  entry: './src/index.tsx',
  target: 'electron-renderer',
  output: {
    filename: 'bundle.js',
  },

  // devtool: "source-map",
  devServer: {
    publicPath: '/dist/',
    hot: true,
    port: process.env.PORT,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   enforce: "pre",
      //   test: /\.js$/,
      //   loader: "source-map-loader"
      // },
      // sass loader
      {
        test: /\.s?[ac]ss$/,
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },
  // plugins
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HotModuleReplacementPlugin({}),
  ],
};
