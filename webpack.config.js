const path = require('path');
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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: false,
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      // favicon: './favicon.ico',
      inject: 'body',
    }),
  ],
};

// module.exports = {
//   mode: 'development',
//   entry: './src/index.tsx',
//   output: {
//     filename: 'build.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   // target: 'web',
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(tsx|ts)$/,
//         use: 'ts-loader',
//         exclude: '/node_modules/'
//       }
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       minify: false,
//       template: path.resolve(__dirname, './index.html'),
//       filename: 'index.html',
//       // favicon: './favicon.ico',
//       inject: 'body',
//     })
//   ]
// }
