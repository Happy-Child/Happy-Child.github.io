'use strict';

const options = {
	syntax: "sass", // sass or less
	cssMin: true, // true or false
	jsMin: true // true or false
}

const gulp 					= require('gulp'),
			gulpIf 				= require('gulp-if'),
			rename 				= require('gulp-rename'),
			concat 				= require('gulp-concat'),
			browserSync 	= require('browser-sync'),
			notify 				= require("gulp-notify"),

			pug 					= require('gulp-pug'),
			prettify			=	require('gulp-prettify'),

			sass 					= require('gulp-sass'),
			less					= require('gulp-less'),
			cssnano 			= require('gulp-cssnano'),
			gcmq					=	require('gulp-group-css-media-queries'),
			autoprefixer  = require('gulp-autoprefixer'),
			
			uglify				= require('gulp-uglify-es').default,
			babel 				= require("gulp-babel");









//Autoreload --------------------------------------- START
gulp.task('browser-sync', () => 
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
);
//Autoreload --------------------------------------- END








//HTML --------------------------------------- START
gulp.task('pug', () =>
	gulp.src('app/pages/*.pug')
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('app/'))
	.pipe(browserSync.stream())
);

gulp.task('formatter', function() {
  return gulp.src('app/*.html')
    .pipe(prettify())
    .pipe(gulp.dest('app'));
});
//HTML --------------------------------------- END









//Styles --------------------------------------- START
gulp.task('styles-common', () =>
	gulp.src(`app/${options.syntax}/main.${options.syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gcmq())
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-libs', () =>
	gulp.src([
		'app/libs/hamburgers-icon/hamburgers.min.css',
		'app/libs/reset.css/reset.min.css',
		'app/libs/animate.css/animate.min.css',
	])
	.pipe(concat('libs.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-fonts', () =>
	gulp.src(`app/${options.syntax}/fonts.${options.syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(concat('fonts.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-concat', ['styles-libs', 'styles-fonts', 'styles-common'], () =>
	gulp.src([
		'app/css/libs.css',
		'app/css/fonts.css',
		'app/css/styles.css'
	])
	.pipe(concat('main.min.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-build', ['styles-concat'], () =>
	gulp.src('app/css/main.min.css')
	.pipe(cssnano({discardComments: {removeAll: true}}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-build-nomin', () =>
	gulp.src('app/css/main.min.css')
	.pipe(concat('main.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);
//Styles --------------------------------------- END









//Scripts --------------------------------------- START
gulp.task('scripts-babel', () =>
	gulp.src([
		'app/js/common.js'
	])
	.pipe(concat('common-babel.js'))
	.pipe(babel({presets: ['es2015']}))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);

gulp.task('scripts-libs', () =>
	gulp.src([
		'app/libs/jquery/jquery.min.js',
		'app/libs/jq-mask/jquery.maskedinput.min.js',
		'app/libs/lazy-line-painter/lazy-line-painter-1.9.6.min.js',
		'app/libs/wow.js/wow.min.js',
	])
	.pipe(concat('libs.js'))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);

gulp.task('scripts-concat', ['scripts-libs'], () =>
	gulp.src([
		'app/js/libs.js',
		'app/js/common.js'
	])
	.pipe(concat('scripts.js'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);

gulp.task('scripts-build', ['scripts-concat', 'scripts-babel'], () =>
	gulp.src([
		'app/js/libs.js',
		'app/js/common-babel.js'
	])
	.pipe(concat('scripts.js'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);

gulp.task('scripts-build-nomin', ['scripts-concat', 'scripts-babel'], () =>
	gulp.src([
		'app/js/libs.js',
		'app/js/common-babel.js'
	])
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);
//Scripts --------------------------------------- END









//Watch --------------------------------------- START
gulp.task('watch', ['pug', 'styles-concat', 'scripts-concat', 'browser-sync'], () => {
	gulp.watch([`app/pages/**/*.pug`,
		`app/modules/**/*.pug`,
		`app/pug/**/*.pug`], ['pug']);

	gulp.watch([
		`app/pages/**/*.${options.syntax}`,
		`app/modules/**/*.${options.syntax}`,
		`app/${options.syntax}/**/*.${options.syntax}`], ['styles-concat']);

	gulp.watch(['app/js/common.js'], ['scripts-concat']);
});
//Watch --------------------------------------- END










//Build --------------------------------------- START
gulp.task('b', gulpIf((options.cssMin && options.jsMin == true),
	['pug', 'formatter', 'styles-build', 'scripts-build'],
	['pug', 'formatter', 'styles-build-nomin', 'scripts-build-nomin']
), () => {
	gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

	gulp.src(gulpIf(options.jsMin, 'app/js/scripts.min.js', 'app/js/scripts.js'))
		.pipe(gulp.dest('dist/js'));

	gulp.src(gulpIf(options.cssMin, 'app/css/main.min.css', 'app/css/main.css'))
		.pipe(gulp.dest('dist/css'));
});
//Build --------------------------------------- END







gulp.task('default', ['watch']);