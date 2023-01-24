const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
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
              modules: {
                auto: true,
                exportLocalsConvention: 'camelCase',

                exportGlobals: true,
                localIdentName: '[local]--[hash:base64:5]',
              },
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
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
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
      favicon: './src/assets/favicon.ico',
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'src/assets' },
      ],
    }),
  ],
  devServer: {
    static: './',
    historyApiFallback: true,
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
  },
};
