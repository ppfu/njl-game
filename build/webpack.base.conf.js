'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vuxLoader = require('vux-loader')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require("webpack")

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}
const webpackConfig = {
	context: path.resolve(__dirname, '../'),
	entry: {
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ?
			config.build.assetsPublicPath : config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', 'less'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
		}
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test')]
			},
			{

				test: /\.less$/,

				loader: "style-loader!css-loader!less-loader",

			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery"
		})
	]
}

module.exports = vuxLoader.merge(webpackConfig, {
	plugins: ['vux-ui']
})
