const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  {
    mode: process.env.NODE_ENV,
    entry: './src/main.ts',
    target: 'electron-main',
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },
      ],
    },
    output: {
      path: __dirname + '/dist',
      publicPath: 'dist/',
      filename: 'main.js',
    },
  },
  {
    mode: process.env.NODE_ENV,
    entry: './src/index.tsx',
    target: 'electron-renderer',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // // dev server settings
    // devtool: "source-map",
    devServer: {
      publicPath: '/dist/',
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:3000',
        },
      ],
      hot: true,
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
    ],
  },
];
