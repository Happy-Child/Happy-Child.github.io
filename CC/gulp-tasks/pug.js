"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import pug from "gulp-pug";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";

const argv = yargs.argv;
const production = !!argv.production;

gulp.task("pug", () => {
	return gulp.src(paths.pug.src)
		.pipe(pug({
			pretty: true
		}))

		.pipe(gulpif(production, replace("critical-styles.css", "critical-styles.min.css")))
		.pipe(gulpif(production, replace("critical-scripts.js", "critical-scripts.min.js")))

		.pipe(gulpif(production, replace("common.css", "common.min.css")))
		.pipe(gulpif(production, replace("common.js", "common.min.js")))

		.pipe(gulpif(production, replace("home.css", "home.min.css")))
		.pipe(gulpif(production, replace("home.js", "home.min.js")))

		.pipe(gulpif(production, replace("laser.css", "laser.min.css")))
		.pipe(gulpif(production, replace("laser.js", "laser.min.js")))

		.pipe(gulpif(production, replace("contacts.css", "contacts.min.css")))
		.pipe(gulpif(production, replace("contacts.js", "contacts.min.js")))

		.pipe(gulpif(production, replace("materials.css", "materials.min.css")))
		.pipe(gulpif(production, replace("materials.js", "materials.min.js")))

		.pipe(gulpif(production, replace("news.css", "news.min.css")))
		.pipe(gulpif(production, replace("news.js", "news.min.js")))

		.pipe(gulpif(production, replace("services.css", "services.min.css")))
		.pipe(gulpif(production, replace("services.js", "services.min.js")))

		.pipe(gulpif(production, replace("grinding.css", "grinding.min.css")))
		.pipe(gulpif(production, replace("grinding.js", "grinding.min.js")))

		.pipe(gulpif(production, replace("article.css", "article.min.css")))
		.pipe(gulpif(production, replace("article.js", "article.min.js")))

		.pipe(gulpif(production, replace("plywood.css", "plywood.min.css")))
		.pipe(gulpif(production, replace("plywood.js", "plywood.min.js")))

		.pipe(gulpif(production, replace("delivery-payment.css", "delivery-payment.min.css")))
		.pipe(gulpif(production, replace("delivery-payment.js", "delivery-payment.min.js")))

		.pipe(gulpif(production, replace("layout-preparation.css", "layout-preparation.min.css")))
		.pipe(gulpif(production, replace("layout-preparation.js", "layout-preparation.min.js")))

		.pipe(gulp.dest(paths.pug.dist))
		.pipe(browsersync.stream());
});
