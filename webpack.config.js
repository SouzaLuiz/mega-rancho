const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    'admin-products': './src/assets/js/pages/admin/products.js',
    'new-product': './src/assets/js/new-product.js',
    'edit-product': './src/assets/js/edit-product.js',
    checkout: './src/assets/js/checkout.js',
    'order-result': './src/assets/js/order-result.js',
    products: './src/assets/js/products.js',
    'shooping-cart': './src/assets/js/shooping-cart.js'
  },

  output: {
    path: path.resolve('public'),
    filename: 'js/[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css'
    })
  ]
}
