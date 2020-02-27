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
		src: "./src/styles/*.scss",
		dist: "./dist/styles/",
		watch: [
			"./src/blocks/**/*.scss",
			"./src/styles/**/*.scss"
		]
	},
	scripts: {
		src: "./src/js/common.js",
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
	webp: {
		src: [
			"./src/img/**/*.{jpg,jpeg,png,tiff}",
			"!./src/img/favicons/*.{jpg,jpeg,png,gif}",
			"!./src/img/preview-social-link/*.{jpg,jpeg,png,gif,tiff}"
		],
		dist: "./dist/img/",
		watch: [
			"./src/img/**/*.{jpg,jpeg,png,tiff}",
			"!./src/img/favicon.{jpg,jpeg,png,gif}",
			"!./src/img/preview-social-link/*.{jpg,jpeg,png,gif,tiff}"
		]
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
	gulp.series(["styles", "scripts", "pug", "inline-source", "images", "webp", "fonts", "generate-favicons"]));

export default development;