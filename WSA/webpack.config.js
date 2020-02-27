const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
	entry: {
		"common": "./src/js/common.js",
		"home": "./src/blocks/pages/home/home.js",
		"about-us": "./src/blocks/pages/about-us/about-us.js",
		"product": "./src/blocks/pages/product/product.js",
		"factory": "./src/blocks/pages/factory/factory.js",
		"order-delivery": "./src/blocks/pages/order-delivery/order-delivery.js",
		"quality": "./src/blocks/pages/quality/quality.js",
		"critical-scripts": "./src/js/critical-scripts.js"
	},

	plugins: [
		new webpack.ProvidePlugin({
			"$": "jquery",
			"jQuery": "jquery"
		})
	],

	output: {
		filename: "[name].js",
		chunkFilename: "[name].js",
		publicPath: "/"
	},

	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					safari10: true
				},
			}),
		]
	},

	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: /node_modules\/(?!(swiper|dom7)\/).*/,
			use: {
				loader: "babel-loader",
				query: {
					presets: [
						["@babel/preset-env", { modules: false }]
					]
				}
			}
		}
		]
	},

	resolve: {
		alias: {
			"%blocks%": path.resolve(__dirname, "src/blocks"),
			"%js%": path.resolve(__dirname, "src/js"),
			"%helpers%": path.resolve(__dirname, "src/js/helpers"),
			"%vendor%": path.resolve(__dirname, "src/js/vendor")
		}
	}
};
