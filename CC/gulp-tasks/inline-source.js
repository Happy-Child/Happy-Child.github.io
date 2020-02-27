"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import inlineSource from "gulp-inline-source";

gulp.task("inline-source", () => {
	return gulp.src(`${paths.pug.dist}*.html`)
		.pipe(inlineSource())
		.pipe(gulp.dest(paths.pug.dist));
});