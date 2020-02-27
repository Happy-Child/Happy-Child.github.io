"use strict";

import gulp from "gulp";

const requireDir = require("require-dir");
const paths = {
	pug: {
		src: [
			"./src/pages/**/*.pug"
		],
		dist: "./dist/",
		watch: [
			"./src/blocks/**/*.pug",
			"./src/pages/**/*.pug",
			"./src/pug/**/*.pug"
		]
	},
	styles: {
		src: [
			"./src/styles/critical-styles.scss",
			"./src/styles/common.scss",
			"./src/blocks/pages/home/home.scss",
			"./src/blocks/pages/laser/laser.scss",
			"./src/blocks/pages/contacts/contacts.scss",
			"./src/blocks/pages/materials/materials.scss",
			"./src/blocks/pages/news/news.scss",
			"./src/blocks/pages/services/services.scss",
			"./src/blocks/pages/grinding/grinding.scss",
			"./src/blocks/pages/article/article.scss",
			"./src/blocks/pages/plywood/plywood.scss",
			"./src/blocks/pages/delivery-payment/delivery-payment.scss",
			"./src/blocks/pages/layout-preparation/layout-preparation.scss",
		],
		dist: "./dist/styles/",
		watch: [
			"./src/blocks/**/*.scss",
			"./src/styles/**/*.scss"
		]
	},
	scripts: {
		src: [
			"./src/js/critical-scripts.js",
			"./src/js/common.js",
			"./src/blocks/pages/home/home.js",
			"./src/blocks/pages/laser/laser.js",
			"./src/blocks/pages/contacts/contacts.js",
			"./src/blocks/pages/materials/materials.js",
			"./src/blocks/pages/news/news.js",
			"./src/blocks/pages/services/services.js",
			"./src/blocks/pages/grinding/grinding.js",
			"./src/blocks/pages/plywood/plywood.js",
			"./src/blocks/pages/delivery-payment/delivery-payment.js",
			"./src/blocks/pages/layout-preparation/layout-preparation.js",
		],
		dist: "./dist/js/",
		watch: [
			"./src/blocks/**/*.js",
			"./src/js/**/*.js"
		]
	},
	images: {
		src: [
			"./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
			"!./src/img/favicons/*.{jpg,jpeg,png,gif,tiff}"
		],
		dist: "./dist/img/",
		watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg}"
	},
	fonts: {
		src: "./src/fonts/**/*.{woff,woff2}",
		dist: "./dist/fonts/",
		watch: "./src/fonts/**/*.{woff,woff2}"
	},
	favicons: {
		src: "./src/img/favicons/favicon.png",
		dist: "./dist/img/favicons/",
	},
	gzip: {
		src: "./src/.htaccess",
		dist: "./dist/"
	}
};

requireDir("./gulp-tasks/");

export { paths };

export const development = gulp.series("clean",
	gulp.parallel(["styles", "scripts", "pug"]),
	gulp.parallel("serve"));

export const prod = gulp.series("clean",
	//gulp.series(["styles", "scripts", "pug"]));
	gulp.series(["styles", "scripts", "pug", "inline-source", "images", "fonts", "generate-favicons"]));

export default development;
