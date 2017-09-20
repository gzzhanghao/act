const path = require('path')

module.exports = {

  entry: {
    main: './src',
  },

  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    publicPath: 'dist',
  },

  devtool: '#source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { targets: { chrome: 61 } }],
            'react',
          ],
          plugins: [
            'transform-class-properties',
          ],
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
