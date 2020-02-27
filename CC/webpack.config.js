const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
	entry: {
		"critical-scripts": 	"./src/js/critical-scripts.js",
		"common": 						"./src/js/common.js",
		"home": 							"./src/blocks/pages/home/home.js",
		"laser": 							"./src/blocks/pages/laser/laser.js",
		"contacts": 					"./src/blocks/pages/contacts/contacts.js",
		"materials": 					"./src/blocks/pages/materials/materials.js",
		"news": 							"./src/blocks/pages/news/news.js",
		"services": 					"./src/blocks/pages/services/services.js",
		"grinding": 					"./src/blocks/pages/grinding/grinding.js",
		"article": 						"./src/blocks/pages/article/article.js",
		"plywood": 						"./src/blocks/pages/plywood/plywood.js",
		"delivery-payment": 	"./src/blocks/pages/delivery-payment/delivery-payment.js",
		"layout-preparation": "./src/blocks/pages/layout-preparation/layout-preparation.js",
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
			"%styles%": path.resolve(__dirname, "src/styles"),
			"%helpers%": path.resolve(__dirname, "src/js/helpers"),
			"%vendor%": path.resolve(__dirname, "src/js/vendor")
		}
	}
};
