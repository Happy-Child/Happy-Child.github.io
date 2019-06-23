'use strict';

const options = {
	syntax: "sass",
	cssMin: true, // True or false
	jsMin: true // True or false
}

const gulp 					= require('gulp'),
			gulpIf 				= require('gulp-if'),
			rename 				= require('gulp-rename'),
			concat 				= require('gulp-concat'),
			browserSync 	= require('browser-sync'),
			notify 				= require("gulp-notify"),

			postcss				= require("gulp-postcss"),
			sass 					= require('gulp-sass'),
			cssnano 			= require('gulp-cssnano'),
			gcmq					=	require('gulp-group-css-media-queries'),
			autoprefixer  = require('gulp-autoprefixer'),
			
			uglify				= require('gulp-uglify-es').default,
			babel 				= require("gulp-babel");









//Autoreload --------------------------------------- START
gulp.task('browser-sync', () => 
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	})
);
//Autoreload --------------------------------------- END








//Styles --------------------------------------- START
gulp.task('styles-common', () =>
	gulp.src(`src/${options.syntax}/main.${options.syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(postcss([ require('postcss-animation') ]))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gcmq())
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-libs', () =>
	gulp.src([
		'src/libs/reset.css/reset.min.css',
		'src/libs/slick/slick.css',
	])
	.pipe(concat('libs.css'))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-fonts', () =>
	gulp.src(`src/${options.syntax}/fonts.${options.syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(concat('fonts.css'))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-concat', ['styles-libs', 'styles-fonts', 'styles-common'], () =>
	gulp.src([
		'src/css/libs.css',
		'src/css/fonts.css',
		'src/css/styles.css'
	])
	.pipe(concat('main.min.css'))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-build', ['styles-concat', 'styles-ie'], () =>
	gulp.src('src/css/main.min.css')
	.pipe(cssnano({discardComments: {removeAll: true}}))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-build-nomin', ['styles-concat', 'styles-ie'], () =>
	gulp.src('src/css/main.min.css')
	.pipe(concat('main.css'))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream())
);


gulp.task('styles-ie', () =>
	gulp.src(`src/${options.syntax}/styles-ie/styles-ie.${options.syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(concat('styles-ie.min.css'))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-edge', () =>
	gulp.src(`src/${options.syntax}/styles-ie/styles-edge.${options.syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(concat('styles-edge.min.css'))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-ie-build', ['styles-ie'], () =>
	gulp.src('src/css/styles-ie.min.css')
	.pipe(cssnano({discardComments: {removeAll: true}}))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-ie-build-nomin', ['styles-ie'], () =>
	gulp.src('src/css/styles-ie.min.css')
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream())
);


gulp.task('styles-edge-build', ['styles-edge'], () =>
	gulp.src('src/css/styles-edge.min.css')
	.pipe(cssnano({discardComments: {removeAll: true}}))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-edge-build-nomin', ['styles-edge'], () =>
	gulp.src('src/css/styles-edge.min.css')
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream())
);
//Styles --------------------------------------- END









//Scripts --------------------------------------- START
gulp.task('scripts-babel', () =>
	gulp.src([
		'src/js/common.js'
	])
	.pipe(concat('common-babel.js'))
	.pipe(babel({presets: ['es2015']}))
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.reload({ stream: true }))
);

gulp.task('scripts-libs', () =>
	gulp.src([
		'src/libs/jquery/jquery.min.js',
		'src/libs/slick/slick.min.js',
	])
	.pipe(concat('libs.js'))
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.reload({ stream: true }))
);

gulp.task('scripts-concat', ['scripts-libs', 'scripts-babel'], () =>
	gulp.src([
		'src/js/libs.js',
		'src/js/common-babel.js'
	])
	.pipe(concat('scripts.js'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.reload({ stream: true }))
);

gulp.task('scripts-build', ['scripts-concat', 'scripts-babel'], () =>
	gulp.src([
		'src/js/libs.js',
		'src/js/common-babel.js'
	])
	.pipe(concat('scripts.js'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.reload({ stream: true }))
);

gulp.task('scripts-build-nomin', ['scripts-concat', 'scripts-babel'], () =>
	gulp.src([
		'src/js/libs.js',
		'src/js/common-babel.js'
	])
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.reload({ stream: true }))
);
//Scripts --------------------------------------- END







//Watch --------------------------------------- START
gulp.task('watch', ['styles-concat', 'styles-ie', 'scripts-concat', 'browser-sync'], () => {
	gulp.watch(`src/*.html`, browserSync.reload);

	gulp.watch([
		`src/pages/**/*.${options.syntax}`,
		`src/modules/**/*.${options.syntax}`,
		`src/${options.syntax}/**/*.${options.syntax}`], ['styles-build']);

	gulp.watch(['src/js/common.js'], ['scripts-concat']);
});
//Watch --------------------------------------- END










//Build --------------------------------------- START
gulp.task('build', gulpIf((options.cssMin && options.jsMin == true),
	['styles-build', 'styles-ie-build', 'styles-edge-build', 'scripts-build'],
	['styles-build-nomin', 'styles-ie-build-nomin', 'styles-edge-build-nomin', 'scripts-build-nomin']
));
//Build --------------------------------------- END







gulp.task('default', ['watch']);