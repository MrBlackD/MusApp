const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  mode: 'development',
  output: {
	filename: 'app.js',
	path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
		test: /\.js$/,
		exclude:/node_modules/,
        use: {
			loader:"babel-loader",
			options:{
				presets:["env","react"]
			}
		}
      }
    ]
  }
};