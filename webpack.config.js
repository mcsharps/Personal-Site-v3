var path = require('path');
module.exports = {
  entry: path.join(process.cwd(), 'client-render.js'),
  output: {
    path: './public/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel'
      }
    ]
  }
}
// module: {
//      loaders: [
//          {
//              test:   /\.css$/,
//              loader: "style-loader!css-loader!postcss-loader"
//          }
//      ]
//  },
//  postcss: function () {
//      return [require('autoprefixer'), require('precss')];
//  }