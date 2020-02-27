"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import browsersync from "browser-sync";

gulp.task("serve", () => {
	browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
	});

	gulp.watch(paths.pug.watch, gulp.parallel( "pug" ));
	gulp.watch(paths.scripts.watch, gulp.parallel( "scripts" ));
	gulp.watch(paths.styles.watch, gulp.parallel( "styles" ));

	// gulp.watch(paths.pug.watch, gulp.parallel( gulp.series("pug", "inline-source") ));
	// gulp.watch(paths.scripts.watch, gulp.parallel( gulp.series("scripts", "inline-source") ));
	// gulp.watch(paths.styles.watch, gulp.parallel( gulp.series("styles", "inline-source") ));
});

