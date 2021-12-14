const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(s*)css$/,
        use: [
          // MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',

          MiniCssExtractPlugin.loader, // 1
          {
            loader: 'css-loader', // 2
            options: {
              // sourceMap,
              import: false,
              modules: true,
              // camelCase: true,
              // localIdentName: isDev ? '[local]' : '[sha1:hash:hex:4]',
            },
          },
          'sass-loader', // 3

        ],
      },
      {
        test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|mp3|json)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      minify: false,
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      favicon: '/src/assets/favicon.ico',
      inject: 'body',
    }),
  ],
};
