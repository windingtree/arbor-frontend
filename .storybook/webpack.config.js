const path = require('path');

module.exports = async ({config}) => {
  config.module.rules.push({
    test: /\.(ttf|otf|woff|woff2|eot)$/,
    use: [
      {
        loader: 'file-loader',
        query: '[name].[ext]'
      }
    ],
    include: path.resolve(__dirname, '../')
  });

  return config;
};